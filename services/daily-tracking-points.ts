#!/usr/bin/env bun

import { fetchThrough } from "@shared/pages-query/fetcher"
import { operationalError } from "../tools/lib/exit.ts"
import { pageQueryInProcess } from "../tools/lib/page-query-in-process.ts"
import { runCommitPoints } from "../tools/lib/daily-tracking/run-commit-points.ts"

const HELP = `bun services/daily-tracking-points.ts — one daily-tracking points recompute

Recomputes the rollups standing on Alan's tracked days: strength, active calories, sleep,
nutrition, tasks and breathing over a rolling fourteen-day window, then the points sources,
persona totals, engine totals, health totals and the session-points ladders.

Every rollup recomputes a day from that day's own window and overwrites, so a settled day
reads the same figure again and running this twice costs nothing but the time.

Reads and writes Alan's pages in this process, off the checkouts on this machine. Nothing is
cloned and nothing is reached over the network.

Environment:
  SUPABASE_URL               Supabase project URL (service-role target)
  SUPABASE_SERVICE_ROLE_KEY  Supabase service-role key

Usage:
  bun ~/repos/akasha/services/daily-tracking-points.ts
  --help  This.

Exit codes:
  0  the recompute ran
  3  operational error: the recompute failed
`

async function main(argv: readonly string[]): Promise<number> {
  if (argv.some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return 0
  }
  for (const one of argv) {
    process.stderr.write(`\`${one}\` is not an argument this takes — run it with --help\n`)
    return 1
  }
  fetchThrough(pageQueryInProcess)
  try {
    await runCommitPoints()
  } catch (err) {
    throw operationalError(
      `the daily-tracking points recompute failed: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
