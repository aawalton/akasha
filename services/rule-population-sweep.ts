#!/usr/bin/env bun

import {
  fileReadingFor,
  LOG,
  READER,
  readRulePopulations,
} from "../tools/lib/rule-population-sweep/sweep.ts"

const HELP = `bun services/rule-population-sweep.ts — read every enforcement rule's population and file the reading

One pass over the code checkout beside this one. It dispatches every syntax scanner across the
whole canonical TS population, counts what each rule WEIGHED rather than what it FOUND, and files
one message in \`${READER}\`'s mailbox saying which rules weighed nothing.

A RULE THAT WEIGHED NOTHING CERTIFIES NOTHING, and prints the same green as a rule that weighed
everything and was satisfied. Its construct may have been retired out from under it, or its pattern
may never have had a population at all. The first wants the rule removed and the second wants it
repaired, so this reports and never refuses — the call stays a person's.

A SWEEP THAT READ NO RULES FILES NOTHING. A reading over zero rules carries the same empty finding
list as a healthy one, so it fails the run instead.

It reads the code repository as it now stands, with no graph cache, so a rule landed this morning
is read this morning.

Driven by the rule-population-sweep service, whose document states its cadence. Safe to run by hand.

Usage:
  bun services/rule-population-sweep.ts
  --dry-run  Read and print the body; file no message.
  --help     This.
`

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  if (args.some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }

  const known = new Set(["--dry-run"])
  for (const one of args) {
    if (known.has(one)) continue
    process.stderr.write(`\`${one}\` is not an argument this takes — run it with --help\n`)
    process.exit(1)
  }

  const log = (line: string): undefined => {
    console.log(line)
    return undefined
  }

  const reading = await readRulePopulations(log)
  log(
    `${LOG} ${reading.emptyCount} empty of ${reading.rulesRead} rule(s) read; one message for \`${READER}\``
  )

  if (args.includes("--dry-run")) {
    process.stdout.write(`${reading.text}\n${LOG} dry run, nothing filed\n`)
    return
  }

  fileReadingFor(reading, log)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${LOG} fatal:`, err instanceof Error ? err.message : err)
    process.exit(1)
  })
}
