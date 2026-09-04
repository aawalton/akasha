import { operationalError } from "@tools/lib/exit"
import {
  type PollAndPersistSummary,
  pollAndPersist,
} from "../inbox-count-tick/inbox-count-tick.module.code.ts"

async function main(): Promise<void> {
  const args = process.argv.slice(2)

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
