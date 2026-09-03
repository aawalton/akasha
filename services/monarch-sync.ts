export const tool = {
  summary: "Copy the whole of Monarch and compare the copy against it",
  repos: ["akasha"],
} as const

import { sync } from "../akasha/alan/harness/monarch/sync/monarch-sync.module.code.ts"

const HELP = `bun services/monarch-sync.ts — copy the whole of Monarch and compare the copy against it

Lands the accounts, categories, tags, merchants, holdings and transactions, then reports our
copy against Monarch's own totals and runs the category rules over what arrived.

THE FULL PASS IS WHAT REPAIRS THE MINUTELY POLL. The poll fetches no accounts and lands no
categories, so every row it left alone is waiting for this.

A FAILING ACCOUNT DOES NOT STOP THE REST. Each is caught and named, and the run ends
non-zero once every account has been tried, so one broken account costs its own rows rather
than the whole night's.

Usage:
  bun ~/repos/akasha/services/monarch-sync.ts [--incremental]

  --incremental  Land the trusted window rather than the whole of Monarch. Only the full run
                 speaks for rows older than that window.
  --help         This.
`

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  await sync({ incremental: argv.includes("--incremental") })
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
