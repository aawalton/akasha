#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"

const PREFIX = "[gate-bun-exit]"

export interface GateInput {
  readonly bunExitCode: number
  readonly output: string
}

// biome-ignore lint/suspicious/noControlCharactersInRegex: matching ANSI CSI escapes requires the ESC control char
const ANSI_RE = /\[[0-9;]*m/g

const SUMMARY_RE = /\bRan\s+\d+\s+tests?\s+across\s+(\d+)\s+files?/g
const FAIL_LINE_RE = /^\s*(\d+)\s+fail\b/gm

interface ParsedSummary {
  readonly hasSummary: boolean
  readonly failTotals: readonly number[]
  readonly filesRan: number | null
}

export function parseBunSummary(output: string): ParsedSummary {
  const clean = output.replace(ANSI_RE, "")
  let filesRan: number | null = null
  for (const m of clean.matchAll(SUMMARY_RE)) {
    const n = Number.parseInt(m[1] ?? "", 10)
    if (Number.isFinite(n)) filesRan = (filesRan ?? 0) + n
  }
  const failTotals: number[] = []
  for (const m of clean.matchAll(FAIL_LINE_RE)) {
    const n = Number.parseInt(m[1] ?? "", 10)
    if (Number.isFinite(n)) failTotals.push(n)
  }
  return { hasSummary: filesRan !== null, failTotals, filesRan }
}

export const CRASH_EXIT_CODE = 75

export const UNDER_RAN_EXIT_CODE = 76

export interface UnderRunReport {
  readonly expected: number
  readonly ran: number | null
}

export function underRanReport(
  output: string,
  expectedFiles: number | null
): UnderRunReport | null {
  if (expectedFiles === null || expectedFiles <= 0) return null
  const { filesRan } = parseBunSummary(output)
  if (filesRan !== null && filesRan >= expectedFiles) return null
  return { expected: expectedFiles, ran: filesRan }
}

export const XARGS_SIGNAL_EXIT = 125

export type RunVerdict = "pass" | "fail" | "crash"

export function classifyRun(input: GateInput): RunVerdict {
  if (input.bunExitCode === 0) return "pass"
  const { hasSummary, failTotals } = parseBunSummary(input.output)
  if (hasSummary && failTotals.length > 0) {
    return failTotals.every((n) => n === 0) ? "pass" : "fail"
  }
  return input.bunExitCode === XARGS_SIGNAL_EXIT || input.bunExitCode >= 128 ? "crash" : "fail"
}

export function decideGatedExit(input: GateInput): number {
  return classifyRun(input) === "pass" ? 0 : input.bunExitCode
}

interface CliArgs {
  readonly exitCode: number
  readonly outputFile: string
  readonly expectedFiles: number | null
}

function parseArgs(argv: readonly string[]): CliArgs {
  let exitCode: number | null = null
  let outputFile: string | null = null
  let expectedFiles: number | null = null

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === undefined) continue
    if (arg === "--exit-code") {
      exitCode = Number.parseInt(argv[++i] ?? "", 10)
    } else if (arg.startsWith("--exit-code=")) {
      exitCode = Number.parseInt(arg.slice("--exit-code=".length), 10)
    } else if (arg === "--output-file") {
      outputFile = argv[++i] ?? null
    } else if (arg.startsWith("--output-file=")) {
      outputFile = arg.slice("--output-file=".length)
    } else if (arg === "--expected-files") {
      expectedFiles = Number.parseInt(argv[++i] ?? "", 10)
    } else if (arg.startsWith("--expected-files=")) {
      expectedFiles = Number.parseInt(arg.slice("--expected-files=".length), 10)
    } else {
      console.error(`${PREFIX} unknown argument: ${arg}`)
      process.exit(1)
    }
  }

  if (exitCode === null || !Number.isFinite(exitCode)) {
    console.error(`${PREFIX} missing or invalid --exit-code <n>`)
    process.exit(1)
  }
  if (outputFile === null) {
    console.error(`${PREFIX} missing --output-file <path>`)
    process.exit(1)
  }

  if (expectedFiles !== null && !Number.isFinite(expectedFiles)) {
    console.error(`${PREFIX} invalid --expected-files <n>`)
    process.exit(1)
  }

  return { exitCode, outputFile, expectedFiles }
}

export function main(argv: readonly string[]): undefined {
  const args = parseArgs(argv)

  if (!existsSync(args.outputFile)) {
    console.error(
      `${PREFIX} output file not found: ${args.outputFile}; propagating exit ${args.exitCode}`
    )
    process.exit(args.exitCode)
  }

  const output = readFileSync(args.outputFile, "utf8")
  const verdict = classifyRun({ bunExitCode: args.exitCode, output })
  if (verdict === "pass") {
    const shortfall = underRanReport(output, args.expectedFiles)
    if (shortfall !== null) {
      const ran = shortfall.ran === null ? "NO summary at all" : `only ${shortfall.ran} file(s)`
      console.error(
        `${PREFIX} bun exited ${args.exitCode} reporting ${ran} where ${shortfall.expected} ` +
          `test file(s) were handed to it; a run that did not execute what it was given has no ` +
          `verdict to report, so this is refused (exit ${UNDER_RAN_EXIT_CODE}) rather than read as green`
      )
      process.exit(UNDER_RAN_EXIT_CODE)
    }
    if (args.exitCode !== 0) {
      console.error(
        `${PREFIX} bun exited ${args.exitCode} after a GREEN run (0 fail); ` +
          `treating as pass so a passing branch is not false-ejected`
      )
    }
    process.exit(0)
  }
  if (verdict === "crash") {
    console.error(
      `${PREFIX} bun exited ${args.exitCode} with NO clean summary (signal death: ` +
        `xargs ${XARGS_SIGNAL_EXIT} or raw >= 128); classifying as an environmental ` +
        `CRASH (exit ${CRASH_EXIT_CODE}) so the runner can re-run this shard in ` +
        `isolation instead of false-ejecting the whole run`
    )
    process.exit(CRASH_EXIT_CODE)
  }
  process.exit(args.exitCode)
}

if (import.meta.main) {
  main(Bun.argv.slice(2))
}
