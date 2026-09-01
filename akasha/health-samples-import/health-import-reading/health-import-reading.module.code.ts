import type { ImportOutcome } from "../health-import-run/health-import-run.module.code.ts"
import type { Reading, VerdictFinding } from "../verdict-reading/verdict-reading.module.code.ts"

export type ImportState = "imported" | "lossy" | "unsettled"

export type ImportReading = Reading<"the-imported-export", ImportState, ImportEvidence>

export interface ImportEvidence {
  readonly recordLines: number
  readonly converted: number
  readonly inserted: number
  readonly unchanged: number
  readonly valueChanged: number
  readonly sourceDefaulted: number
  readonly resumedFrom: number
}

function evidenceOf(outcome: ImportOutcome): ImportEvidence {
  return {
    recordLines: outcome.tally.recordLines,
    converted: outcome.tally.converted,
    inserted: outcome.write.inserted,
    unchanged: outcome.write.unchanged,
    valueChanged: outcome.write.valueChanged,
    sourceDefaulted: outcome.tally.sourceDefaulted,
    resumedFrom: outcome.resumedFrom,
  }
}

function lossFindings(outcome: ImportOutcome): readonly VerdictFinding[] {
  const findings: VerdictFinding[] = []
  if (outcome.tally.unparseable > 0) {
    findings.push({
      at: "unparseable",
      detail: `${outcome.tally.unparseable} record line(s) did not parse — a malformed instant or an attribute set the boundary refused`,
    })
  }
  for (const [reason, count] of Object.entries(outcome.tally.rejected)) {
    if (count > 0) findings.push({ at: reason, detail: `${count} record(s) refused: ${reason}` })
  }
  return findings
}

function doubtFindings(outcome: ImportOutcome): readonly VerdictFinding[] {
  const findings: VerdictFinding[] = []
  if (outcome.write.valueChanged > 0) {
    findings.push({
      at: "valueChanged",
      detail: `${outcome.write.valueChanged} stored sample(s) had a value overwritten — either HealthKit revised a reading after we first read it, or two distinct samples collided on the dedupe key and one is now lost. This run cannot tell those apart; go and look`,
    })
  }
  if (outcome.tally.sourceDefaulted > 0) {
    findings.push({
      at: "sourceDefaulted",
      detail: `${outcome.tally.sourceDefaulted} record(s) carried no sourceName and were stored under a placeholder, which is part of the dedupe key — the phone stream will spell the same device differently and would not collapse onto these rows`,
    })
  }
  return findings
}

export function importReading(
  outcome: ImportOutcome,
  args: { readonly dryRun: boolean; readonly observedAtMs: number }
): ImportReading {
  const evidence = evidenceOf(outcome)
  const coverage = {
    observed: outcome.tally.recordLines,
    declared: outcome.tally.recordLines,
    unit: "export records for the two imported metrics",
  }
  const base = { subject: "the-imported-export" as const, observedAtMs: args.observedAtMs }
  const resumeNote =
    outcome.resumedFrom > 0
      ? `; ${outcome.resumedFrom} record line(s) were written by an earlier run and are not certified here`
      : ""

  const losses = lossFindings(outcome)
  const firstLoss = losses[0]
  if (firstLoss !== undefined) {
    return {
      ...base,
      state: "lossy",
      coverage,
      evidence,
      reason: `${outcome.tally.recordLines - outcome.tally.converted} of ${outcome.tally.recordLines} record(s) did not reach the table${resumeNote}`,
      findings: [firstLoss, ...losses.slice(1)],
    }
  }

  const doubts = args.dryRun ? [] : doubtFindings(outcome)
  if (doubts.length > 0) {
    return {
      ...base,
      state: "unsettled",
      coverage,
      evidence,
      reason: `all ${outcome.tally.recordLines} record(s) converted, but ${doubts.length} thing(s) about the stored rows cannot be settled from here${resumeNote}`,
      findings: doubts,
    }
  }

  return {
    ...base,
    state: "imported",
    coverage,
    evidence,
    findings: [],
    reason: args.dryRun
      ? `every one of ${outcome.tally.recordLines} record(s) converts cleanly; nothing was written`
      : `every one of ${outcome.tally.recordLines} record(s) reached the table under its own source name, with no stored value overwritten${resumeNote}`,
  }
}
