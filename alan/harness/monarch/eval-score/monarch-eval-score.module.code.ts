#!/usr/bin/env bun

import type { Proposal } from "../eval-agent/monarch-eval-agent.module.code.ts"
import { STRATA } from "../eval-population/monarch-eval-population.module.code.ts"
import type { RunFile } from "../eval-run/monarch-eval-run.module.code.ts"
import { readFlags } from "../rule-pages/monarch-rule-pages.module.code.ts"
import { array, object } from "../shape/monarch-shape.module.code.ts"

type Confidence = Proposal["confidence"]
const LEVELS: readonly Confidence[] = ["high", "medium", "low"]

interface Scored {
  readonly monarchId: string
  readonly stratum: string
  readonly standing: string
  readonly proposed: string | null
  readonly confidence: Confidence | null
  readonly reason: string
  readonly agrees: boolean
  readonly invalid: boolean
  readonly merchant: string
  readonly statement: string
  readonly isSplit: boolean
}

function rate(right: number, of: number): string {
  return of === 0
    ? "     — (0)"
    : `${((100 * right) / of).toFixed(1).padStart(5)}% (${right}/${of})`
}

function score(file: RunFile): readonly Scored[] {
  const said = new Map(file.proposals.map((p) => [p.monarchId, p]))
  const offered = new Set(file.offered)
  return file.drawn.map((row) => {
    const proposal = said.get(row.monarchId) ?? null
    return {
      monarchId: row.monarchId,
      stratum: row.stratum,
      standing: row.standingCategory,
      proposed: proposal?.category ?? null,
      confidence: proposal?.confidence ?? null,
      reason: proposal?.reason ?? "",
      agrees: proposal !== null && proposal.category === row.standingCategory,
      invalid: proposal !== null && !offered.has(proposal.category),
      merchant: row.merchant,
      statement: row.statement,
      isSplit: row.isSplit,
    }
  })
}

function tally(rows: readonly Scored[]): { readonly right: number; readonly of: number } {
  return { right: rows.filter((r) => r.agrees).length, of: rows.length }
}

function counted(values: readonly string[]): readonly (readonly [string, number])[] {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return [...counts].sort((a, b) => b[1] - a[1])
}

function stratumReport(name: string, rows: readonly Scored[], share: number): readonly string[] {
  const all = tally(rows)
  const out: string[] = [
    "",
    `## ${name} — ${rows.length} scored, ${(100 * share).toFixed(1)}% of the population`,
    "",
    `  agrees with Jenny overall   ${rate(all.right, all.of)}`,
    "",
    "  by the agent's own confidence:",
  ]
  for (const level of LEVELS) {
    const at = rows.filter((r) => r.confidence === level)
    const t = tally(at)
    const coverage = rows.length === 0 ? 0 : (100 * at.length) / rows.length
    out.push(
      `    ${level.padEnd(7)} ${coverage.toFixed(1).padStart(5)}% of the stratum   right ${rate(t.right, t.of)}`
    )
  }
  const unanswered = rows.filter((r) => r.confidence === null).length
  if (unanswered > 0) out.push(`    (no proposal came back for ${unanswered})`)
  const invalid = rows.filter((r) => r.invalid).length
  if (invalid > 0) {
    out.push(
      `    (${invalid} named a category never offered, which is a fault rather than a disagreement)`
    )
  }

  const high = rows.filter((r) => r.confidence === "high")
  const highT = tally(high)
  const residual = rows.length - high.length
  out.push(
    "",
    "  were only `high` applied without asking:",
    `    Jenny's queue falls by ${rows.length === 0 ? 0 : ((100 * high.length) / rows.length).toFixed(1)}%` +
      ` — ${high.length} of ${rows.length} settled, ${residual} still hers`,
    `    and of what was settled, ${rate(highT.right, highT.of)} matches what she chose,`,
    `    so ${highT.of - highT.right} wrong categories land where nobody looks again`
  )

  out.push("", "  per category:")
  for (const [category, n] of counted(rows.map((r) => r.standing))) {
    const at = rows.filter((r) => r.standing === category)
    const t = tally(at)
    out.push(`    ${category.padEnd(28)} ${rate(t.right, t.of)}`)
    void n
  }

  const wrong = rows.filter((r) => !r.agrees && r.proposed !== null)
  if (wrong.length > 0) {
    out.push("", "  where it went instead, most often:")
    for (const [pair, n] of counted(wrong.map((r) => `${r.standing} -> ${r.proposed}`)).slice(
      0,
      6
    )) {
      out.push(`    ${String(n).padStart(4)}  ${pair}`)
    }
  }
  return out
}

function precision(rows: readonly Scored[]): readonly string[] {
  const high = rows.filter((r) => r.confidence === "high" && r.proposed !== null)
  const out = [
    "",
    "## When the agent says X at high confidence, how often X is true",
    "",
    "  This is the number a gate is built on. The per-stratum rates above answer a",
    "  question nobody can ask at decision time, because they are keyed on the answer",
    "  rather than on what the agent said.",
    "",
  ]
  for (const [category, n] of counted(high.map((r) => r.proposed ?? ""))) {
    if (n < 3) continue
    const said = high.filter((r) => r.proposed === category)
    const t = tally(said)
    out.push(`    says ${category.padEnd(24)} ${rate(t.right, t.of)}`)
  }
  return out
}

function examples(rows: readonly Scored[], title: string, want: number): readonly string[] {
  const wrong = rows.filter((r) => !r.agrees && r.confidence === "high").slice(0, want)
  if (wrong.length === 0) return []
  const out = ["", `## ${title}`, ""]
  for (const row of wrong) {
    out.push(
      `  ${row.merchant || "(no merchant)"} — ${row.statement.slice(0, 60)}`,
      `    Jenny: ${row.standing}   agent (high): ${row.proposed}`,
      `    its reason: ${row.reason}`,
      ""
    )
  }
  return out
}

export function report(file: RunFile): string {
  const rows = score(file)
  const pop = file.populationSummary
  const out: string[] = [
    `# Where an agent can settle a category, and where it cannot`,
    "",
    `Pool ${file.pool}${file.reruns ? " (RERUN — a figure had already been seen when this ran)" : ""}` +
      `, model ${file.model}, ${file.calls} calls, $${file.costUsd.toFixed(2)}.`,
    `Drawn ${file.perStratum} per stratum. Started ${file.startedAt}.`,
    "",
    "## The population this is about",
    "",
    `  ${pop.total} transactions stand.`,
    `  ${pop.ruleReached} are reached by a standing rule, so they are not this project's subject.`,
    `  ${pop.unanswered} of the rest carry no category anyone chose — no answer to score against,`,
    `    and these are the rows the pipeline most exists to serve.`,
    `  ${pop.scorable} are scorable, and that is the denominator every figure below sits in.`,
    "",
  ]
  for (const stratum of STRATA) {
    out.push(
      `  ${stratum.padEnd(18)} ${String(pop.byStratum[stratum] ?? 0).padStart(5)} in the population`
    )
  }

  for (const stratum of STRATA) {
    const at = rows.filter((r) => r.stratum === stratum)
    const share = pop.scorable === 0 ? 0 : (pop.byStratum[stratum] ?? 0) / pop.scorable
    out.push(...stratumReport(stratum, at, share))
  }

  out.push(...precision(rows))

  out.push(
    ...examples(
      rows.filter((r) => r.stratum === "ENVELOPE-PERSON"),
      "Confident and wrong about whose envelope — the shape this was built to look for",
      5
    )
  )

  const splits = rows.filter((r) => r.isSplit)
  if (splits.length > 0) {
    const t = tally(splits)
    const whole = tally(rows.filter((r) => !r.isSplit))
    out.push(
      "",
      "## Splits, where what the agent sees underdescribes what was categorized",
      "",
      `  split rows   ${rate(t.right, t.of)}`,
      `  whole rows   ${rate(whole.right, whole.of)}`
    )
  }

  let weighted = 0
  let covered = 0
  for (const stratum of STRATA) {
    const at = rows.filter((r) => r.stratum === stratum)
    if (at.length === 0) continue
    const share = pop.scorable === 0 ? 0 : (pop.byStratum[stratum] ?? 0) / pop.scorable
    weighted += share * (tally(at).right / at.length)
    covered += share
  }
  out.push(
    "",
    "## The single number, printed last and on purpose",
    "",
    `  Reweighting each stratum to its share of the ${pop.scorable} scorable rows gives`,
    `  ${(100 * weighted).toFixed(1)}% agreement overall, over ${(100 * covered).toFixed(0)}% of the population.`,
    "",
    "  RECONSTRUCTED, NOT MEASURED — the sample is stratified, so no run ever saw",
    "  this mixture. It is here to be compared against the strata above, and it is",
    "  the figure to refuse if anyone asks whether the agent 'works'. The strata",
    "  disagree with each other, and that disagreement is the answer.",
    "",
    "## Nothing was written",
    "",
    "  Every monarch- page type, before the run and after:"
  )
  for (const slug of Object.keys(file.digestBefore).sort()) {
    out.push(`    ${slug.padEnd(22)} before: ${file.digestBefore[slug]}`)
    out.push(`    ${"".padEnd(22)} after:  ${file.digestAfter[slug]}`)
  }
  out.push(
    "",
    file.pagesMoved.length === 0
      ? "  Nothing moved. No row count and no last-changed time differs across the run."
      : `  MOVED: ${file.pagesMoved.join("; ")}`
  )
  return out.join("\n")
}

if (import.meta.main) {
  const flags = readFlags(process.argv.slice(2))
  const path = flags.get("file")?.[0]
  if (path === undefined) throw new Error("--file <run.json> is wanted, as run.ts wrote it")
  const parsed = object(JSON.parse(await Bun.file(path).text()), "run file")
  void array(parsed.drawn, "run file.drawn")
  console.log(report(parsed as unknown as RunFile))
}
