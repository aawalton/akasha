#!/usr/bin/env bun

import { mailbox } from "akasha/alan/google/email/modules/gmail-mailbox/gmail-mailbox.module.code.ts"
import {
  oneRun,
  type RunReport,
} from "akasha/alan/harness/email-watch/modules/inbox-run/inbox-run.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const PERSON = "--person"

const ALAN = "alan"

const FLAG = "--"

export function personIn(argv: readonly string[]): string {
  const at = argv.indexOf(PERSON)
  if (at === -1) return ALAN
  const named = argv[at + 1]
  if (named === undefined || named === "" || named.startsWith(FLAG)) return ALAN
  return named
}

export function tallyOf(report: RunReport): string {
  return (
    `run: examined ${String(report.examined)} message(s) — ` +
    `${String(report.acted)} acted on, ${String(report.waiting)} waiting on an agent, ` +
    `${String(report.unclaimed)} that no rule claimed, ` +
    `${String(report.discarded)} discarded off a persona's channel`
  )
}

export function saidOf(report: RunReport): readonly string[] {
  return [...report.decisions.map((one) => `  ${one}`), tallyOf(report)]
}

async function ran(argv: readonly string[]): Promise<number> {
  const report = await oneRun(personIn(argv), akashaRoot(), await mailbox())
  for (const line of saidOf(report)) process.stdout.write(`${line}\n`)
  return 0
}

if (import.meta.main) process.exitCode = await ran(process.argv.slice(2))
