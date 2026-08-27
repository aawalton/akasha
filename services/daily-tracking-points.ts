#!/usr/bin/env bun

import { operationalError } from "../tools/lib/exit.ts"
import { pageQueryOrigin } from "../tools/lib/page-query-client.ts"
import { runCommitPoints } from "../tools/lib/daily-tracking/run-commit-points.ts"

const HELP = `bun services/daily-tracking-points.ts — one daily-tracking points recompute

Recomputes the rollups standing on Alan's tracked days: strength, active calories, sleep,
nutrition, tasks and breathing over a rolling fourteen-day window, then the points sources,
persona totals, engine totals, health totals and the session-points ladders.

Every rollup recomputes a day from that day's own window and overwrites, so a settled day
reads the same figure again and running this twice costs nothing but the time.

Reads and writes Alan's pages through the page query service. Nothing is cloned.

Environment:
  SUPABASE_URL               Supabase project URL (service-role target)
  SUPABASE_SERVICE_ROLE_KEY  Supabase service-role key
  PAGE_QUERY_ORIGIN          Optional; where the page query service answers

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
  process.env.PAGE_QUERY_ORIGIN ??= pageQueryOrigin()
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
