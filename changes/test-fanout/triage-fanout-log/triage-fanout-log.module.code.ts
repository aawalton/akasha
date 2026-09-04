#!/usr/bin/env bun

import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import type { Verdict, VerdictFinding } from "@akasha/verdict/verdict-shape"
import { z } from "zod"
import { parseBunSummary } from "../bun-exit-gating/bun-exit-gating.module.code.ts"
import {
  attributionFor,
  type FailLine,
  type FailSignal,
  splitProducerTag,
  UNATTRIBUTED_SECTION,
} from "../triage-fanout-attribution/triage-fanout-attribution.module.code.ts"
import {
  ANNOUNCE_RE,
  FAIL_TALLY_RE,
  FAIL_TEST_RE,
  FILE_HEADER_RE,
  REFUSAL_RE,
  RUNNER_MARKER_RE,
  SECTION_RE,
  SKIP_RE,
  stripAnsi,
} from "../triage-fanout-markers/triage-fanout-markers.module.code.ts"
import { renderResult } from "../triage-fanout-render/triage-fanout-render.module.code.ts"

const PREFIX = "[triage-fanout]"

export type FanoutSubject = "the-consolidated-fanout-log"

export interface FanoutEvidence {
  readonly totalFail: number
  readonly workspacesSeen: readonly string[]
  readonly failingWorkspaces: readonly string[]
  readonly failingFiles: readonly string[]
  readonly failLines: readonly FailLine[]
  readonly failEvidence: readonly string[]
  readonly refusals: readonly string[]
  readonly expectedWorkspaces: number | null
  readonly cleanTerminals: number
  readonly complete: boolean
}

export type FanoutTriageResult = Verdict<FanoutSubject, FanoutEvidence>

export function sawFailure(evidence: FanoutEvidence): boolean {
  return evidence.totalFail > 0 || evidence.failLines.length > 0 || evidence.refusals.length > 0
}

export function decideTriageExit(result: FanoutTriageResult): 0 | 1 | 2 {
  if (result.kind === "pass") return 0
  return sawFailure(result.evidence) ? 1 : 2
}

const SUBJECT: FanoutSubject = "the-consolidated-fanout-log"

export function analyzeFanoutLog(
  lines: readonly string[],
  observedAtMs: number
): FanoutTriageResult {
  const tagged = lines.map(splitProducerTag)
  const whole = tagged.map((t) => t.text).join("\n")
  const { failTotals } = parseBunSummary(whole)
  const totalFail = failTotals.reduce((sum, n) => sum + n, 0)

  const workspacesSeen: string[] = []
  const signals: FailSignal[] = []
  const failEvidence: string[] = []
  const producerFiles = new Map<string, string>()
  let current: string | null = null
  let untaggedFile: string | null = null
  let sawRunnerMarker = false
  let expectedWorkspaces: number | null = null
  let skipCount = 0
  const refusals: string[] = []

  for (const { producer, text } of tagged) {
    const line = stripAnsi(text)
    if (RUNNER_MARKER_RE.test(line)) sawRunnerMarker = true
    if (producer !== null && !workspacesSeen.includes(producer)) workspacesSeen.push(producer)

    if (REFUSAL_RE.test(line)) {
      refusals.push(line.trim())
      continue
    }
    if (ANNOUNCE_RE.test(line)) {
      const [digits] = requireMatchPositional(ANNOUNCE_RE, z.tuple([z.string()]), line)
      const n = Number.parseInt(digits, 10)
      if (Number.isFinite(n)) expectedWorkspaces = n
      continue
    }
    if (SKIP_RE.test(line)) {
      skipCount++
      continue
    }

    if (SECTION_RE.test(line)) {
      const [ws] = requireMatchPositional(SECTION_RE, z.tuple([z.string()]), line)
      current = ws
      if (!workspacesSeen.includes(current)) workspacesSeen.push(current)
      continue
    }

    if (FILE_HEADER_RE.test(line)) {
      const [file] = requireMatchPositional(FILE_HEADER_RE, z.tuple([z.string()]), line)
      if (producer === null) untaggedFile = file
      else producerFiles.set(producer, file)
      continue
    }

    if (FAIL_TEST_RE.test(line)) {
      failEvidence.push(line.trim())
      signals.push({
        evidence: line.trim(),
        signal: "test",
        producer,
        file: producer === null ? untaggedFile : (producerFiles.get(producer) ?? null),
        workspace: producer ?? current,
      })
      continue
    }

    if (FAIL_TALLY_RE.test(line)) {
      const [digits] = requireMatchPositional(FAIL_TALLY_RE, z.tuple([z.string()]), line)
      const n = Number.parseInt(digits, 10)
      if (Number.isFinite(n) && n > 0) {
        failEvidence.push(line.trim())
        signals.push({
          evidence: line.trim(),
          signal: "tally",
          producer,
          file: null,
          workspace: producer ?? current,
        })
      }
    }
  }

  const failLines: readonly FailLine[] = signals.map((signal) => ({
    evidence: signal.evidence,
    signal: signal.signal,
    attribution: attributionFor(signal, sawRunnerMarker),
  }))
  const failingWorkspaces: string[] = []
  const failingFiles: string[] = []
  for (const { attribution } of failLines) {
    if (attribution.kind !== "resolved") continue
    const workspace = attribution.workspace ?? UNATTRIBUTED_SECTION
    if (!failingWorkspaces.includes(workspace)) failingWorkspaces.push(workspace)
    if (attribution.file !== null && !failingFiles.includes(attribution.file)) {
      failingFiles.push(attribution.file)
    }
  }

  const cleanTerminals = failTotals.length + skipCount
  const complete = expectedWorkspaces !== null && cleanTerminals > 0
  const evidence: FanoutEvidence = {
    totalFail,
    workspacesSeen,
    failingWorkspaces,
    failingFiles,
    failLines,
    failEvidence,
    refusals,
    expectedWorkspaces,
    cleanTerminals,
    complete,
  }
  const anyFail = sawFailure(evidence)
  const coverage = {
    observed: cleanTerminals,
    declared: expectedWorkspaces,
    unit: "workspace terminals",
  }

  const findings: readonly VerdictFinding[] = [
    ...refusals.map((r) => ({ detail: r, at: null })),
    ...failLines.map((failLine) => ({
      detail: failLine.evidence,
      at: failLine.attribution.kind === "resolved" ? failLine.attribution.file : null,
    })),
  ]
  const [firstFinding, ...restFindings] = findings

  if (anyFail) {
    const named: readonly [VerdictFinding, ...VerdictFinding[]] =
      firstFinding === undefined
        ? [{ detail: `${totalFail} failure(s) tallied with no fail line to name`, at: null }]
        : [firstFinding, ...restFindings]
    const refused =
      refusals.length > 0 ? `${refusals.length} refusal(s) — a run that executed no test; ` : ""
    return {
      kind: "fail",
      subject: SUBJECT,
      reason: `${refused}${totalFail} failure(s) across ${failingWorkspaces.length} workspace(s)`,
      observedAtMs,
      coverage,
      evidence,
      findings: named,
    }
  }

  if (complete) {
    return {
      kind: "pass",
      subject: SUBJECT,
      reason: "no fail line or positive fail tally anywhere in a provably complete log",
      observedAtMs,
      coverage,
      evidence,
    }
  }

  const incomplete =
    expectedWorkspaces === null
      ? "no announce line — the log is truncated or is not a consolidated fan-out log, so green cannot be proved"
      : `announce line present (expected ${expectedWorkspaces}) but zero workspace clean terminals, so green cannot be proved`
  return {
    kind: "fail",
    subject: SUBJECT,
    reason: incomplete,
    observedAtMs,
    coverage,
    evidence,
    findings: [{ detail: incomplete, at: null }],
  }
}

const LokiRowSchema = z.object({ timestamp: z.string(), line: z.string() }).strict()

export function normalizeLogInput(stdin: string): readonly string[] {
  const raw = stdin.split("\n")
  const nonEmpty = raw.filter((l) => l.trim() !== "")
  if (nonEmpty.length === 0) return []

  const rows: z.infer<typeof LokiRowSchema>[] = []
  for (const l of nonEmpty) {
    const t = l.trim()
    if (t[0] !== "{") return raw
    let row: z.infer<typeof LokiRowSchema> | null = null
    try {
      const parsed = LokiRowSchema.safeParse(JSON.parse(t))
      if (parsed.success) row = parsed.data
    } catch {
      return raw
    }
    if (row === null) return raw
    rows.push(row)
  }

  rows.sort((a, b) => (a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0))
  return rows.map((r) => r.line)
}

export async function main(argv: readonly string[]): Promise<void> {
  for (const a of argv) {
    if (a === "--help" || a === "-h") continue
    console.error(`${PREFIX} unexpected argument: ${a}; this command reads the log from stdin`)
    process.exit(64)
  }

  const stdin = await Bun.stdin.text()
  const lines = normalizeLogInput(stdin)
  if (lines.length === 0) {
    console.error(
      `${PREFIX} empty input on stdin; pipe a COMPLETE consolidated fan-out pod log ` +
        "(the whole log for the pod, not a tail of it)"
    )
    process.exit(2)
  }

  const result = analyzeFanoutLog(lines, Date.now())
  console.log(renderResult(result))
  process.exit(decideTriageExit(result))
}

if (import.meta.main) {
  await main(Bun.argv.slice(2))
}
