#!/usr/bin/env bun

import { mailbox } from "@akasha/google-email/gmail-mailbox"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { oneRun, type RunReport } from "../inbox-run/inbox-run.module.code.ts"

const DRY_RUN = "--dry-run"

const PERSON = "--person"

const ALAN = "alan"

const FLAG = "--"

export function dryRunIn(argv: readonly string[]): boolean {
  return argv.includes(DRY_RUN)
}

export function personIn(argv: readonly string[]): string {
  const at = argv.indexOf(PERSON)
  if (at === -1) return ALAN
  const named = argv[at + 1]
  if (named === undefined || named === "" || named.startsWith(FLAG)) return ALAN
  return named
}

export function tallyOf(report: RunReport, dryRun: boolean): string {
  return (
    `${dryRun ? "dry-run" : "pass"}: examined ${String(report.examined)} message(s) — ` +
    `${String(report.acted)} acted on, ${String(report.waiting)} waiting on an agent, ` +
    `${String(report.unclaimed)} that no rule claimed`
  )
}

export function saidOf(report: RunReport, dryRun: boolean): readonly string[] {
  return [...report.decisions.map((one) => `  ${one}`), tallyOf(report, dryRun)]
}

export async function pass(argv: readonly string[]): Promise<number> {
  const dryRun = dryRunIn(argv)
  const report = await oneRun(personIn(argv), akashaRoot(), await mailbox(), { dryRun })
  for (const line of saidOf(report, dryRun)) process.stdout.write(`${line}\n`)
  return 0
}

if (import.meta.main) process.exitCode = await pass(process.argv.slice(2))
