export const tool = {
  summary: "Land the Monarch rows whose update time has moved",
  repos: ["akasha"],
} as const

import { pollTransactions } from "../akasha/alan/harness/monarch/poll/monarch-poll.module.code.ts"

const HELP = `bun services/monarch-poll.ts — land the Monarch rows whose update time has moved

Asks Monarch for the update stamp of every transaction in the trusted window and compares
each against the watermark our copy holds. Only the rows that moved are refetched, so a
minute where nothing changed costs one call.

A ROW NAMING AN ACCOUNT THIS MIRROR HAS NOT LANDED IS LEFT ALONE. This path fetches no
accounts, so an unknown one waits for the daily full run rather than failing every run after
this one. An unknown category is the same: the row keeps the category it holds.

A ROW MONARCH NO LONGER LISTS IS RETIRED, judged against the window that was fetched rather
than against a single missing id.

Usage:
  bun ~/repos/akasha/services/monarch-poll.ts [--verbose]

  --verbose  Say so even when every watermark is the one we already hold.
  --help     This.
`

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  await pollTransactions({ verbose: argv.includes("--verbose") })
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
