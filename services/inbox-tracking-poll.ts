#!/usr/bin/env bun

import { operationalError } from "../tools/lib/exit.ts"
import { pollAndPersist, type PollAndPersistSummary } from "../tools/lib/inbox-tracking/poll-and-persist.ts"

const HELP = `bun services/inbox-tracking-poll.ts — one inbox-tracking poll and persist tick

Polls the four inbox sources (email, tasks, temper-tasks, texts) independently and writes the
present counts — plus a per-inbox cleared-to-zero-today flag — onto the ESO day's
\`daily-tracking\` row, then exits. The email count also lands on the wake day's \`email-entry\`,
where it is kept only when it is lower than the count already standing there.

A source that FAILS is omitted from the write rather than recorded as 0, and is reported under
\`failed\`; the run still exits 0. A zero written for a source that could not be reached would
read as an inbox somebody had cleared.

Driven by the inbox-tracking-poll service, whose document states its cadence. Safe to run by hand.

Default stdout, one line:
  day=<YYYY-MM-DD> outcome=<created|patched> <key=count ...> failed=<a,b|none>

Environment:
  SUPABASE_URL               Supabase project URL (service-role target)
  SUPABASE_SERVICE_ROLE_KEY  Supabase service-role key
  USER_ID                    User id the task and temper-task counts are scoped to

Usage:
  bun services/inbox-tracking-poll.ts
  --json  Emit JSON rather than the summary line.
  --help  This.

Exit codes:
  0  the tick ran; a failed source is reported, never an exit code
  3  operational error: the persist write failed
`

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  if (args.some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }

  const known = new Set(["--json"])
  for (const one of args) {
    if (!known.has(one)) {
      process.stderr.write(`\`${one}\` is not an argument this takes — run it with --help\n`)
      process.exit(1)
    }
  }

  const log = (level: "INFO" | "ERROR", message: string): undefined => {
    if (level === "ERROR") process.stderr.write(`${message}\n`)
    return undefined
  }

  let summary: PollAndPersistSummary
  try {
    summary = await pollAndPersist(log)
  } catch (err) {
    throw operationalError(
      `the inbox-tracking tick failed to persist: ${err instanceof Error ? err.message : String(err)}`
    )
  }

  if (args.includes("--json")) {
    process.stdout.write(
      `${JSON.stringify({
        ok: true,
        day: summary.day,
        outcome: summary.outcome,
        counts: summary.counts,
        failed: summary.failed,
      })}\n`
    )
    return
  }

  const counts = Object.entries(summary.counts)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ")
  const failed = summary.failed.length === 0 ? "none" : summary.failed.join(",")
  process.stdout.write(`day=${summary.day} outcome=${summary.outcome} ${counts} failed=${failed}\n`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("inbox-tracking-poll fatal:", err)
    process.exit(1)
  })
}
