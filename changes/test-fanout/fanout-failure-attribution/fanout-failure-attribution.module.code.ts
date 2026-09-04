#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { UNATTRIBUTED_SECTION } from "../triage-fanout-attribution/triage-fanout-attribution.module.code.ts"
import {
  analyzeFanoutLog,
  type FanoutTriageResult,
  normalizeLogInput,
} from "../triage-fanout-log/triage-fanout-log.module.code.ts"
import { renderResult } from "../triage-fanout-render/triage-fanout-render.module.code.ts"

const PREFIX = "[run-typed-tests]"

export function renderFailureHeadline(result: FanoutTriageResult, testType: string): string {
  const { refusals, failLines } = result.evidence
  const head = `${PREFIX} ${testType}: FAILED —`

  const [refusal] = refusals
  if (refusal !== undefined) {
    const more = refusals.length > 1 ? ` (+${refusals.length - 1} more)` : ""
    return `${head} a run that executed no test: ${refusal}${more}`
  }

  const located = failLines.find((l) => l.attribution.kind === "resolved")
  if (located !== undefined && located.attribution.kind === "resolved") {
    const { workspace, file } = located.attribution
    const where = `workspace ${workspace ?? UNATTRIBUTED_SECTION}, file ${file ?? "(not located)"}`
    return `${head} ${where}, test ${located.evidence}`
  }

  const [declined] = failLines
  if (declined !== undefined) {
    return `${head} ${failLines.length} fail signal(s), none attributable — concurrent workers share one stdout and these lines carry no producing-process tag. Find the owner by grepping the repo for the test name in: ${declined.evidence}`
  }

  return `${head} the consolidated log holds no fail signal and no refusal, so it does not explain this step's exit: ${result.reason}`
}

function parseArgs(argv: readonly string[]): { logPath: string; testType: string } {
  let logPath: string | null = null
  let testType = "unknown-type"
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--log") logPath = argv[++i] ?? null
    else if (arg === "--test-type") testType = argv[++i] ?? testType
  }
  if (logPath === null) throw new Error("missing --log <path>")
  return { logPath, testType }
}

export function main(argv: readonly string[]): undefined {
  let args: { logPath: string; testType: string }
  try {
    args = parseArgs(argv)
  } catch (error) {
    console.log(`${PREFIX} failure attribution unavailable: ${String(error)}`)
    return
  }
  let raw: string
  try {
    raw = readFileSync(args.logPath, "utf-8")
  } catch (error) {
    console.log(
      `${PREFIX} ${args.testType}: FAILED — the consolidated log could not be read, so the failure is unattributed here: ${String(error)}`
    )
    return
  }

  const lines = normalizeLogInput(raw)
  if (lines.length === 0) {
    console.log(
      `${PREFIX} ${args.testType}: FAILED — the consolidated log was empty, so the failure is unattributed here`
    )
    return
  }

  const result = analyzeFanoutLog(lines, Date.now())
  console.log(renderResult(result))
  console.log(renderFailureHeadline(result, args.testType))
}

if (import.meta.main) {
  main(Bun.argv.slice(2))
}
