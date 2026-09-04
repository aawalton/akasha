import { readdirSync, readFileSync, statSync } from "node:fs"
import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { operationalError } from "@akasha/errors-core/exit-code"
import { AKASHA, akashaRoot, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { seatsPresent } from "@akasha/seat-system/seat-roster"
import { ran } from "@akasha/utils-run/running"

const SETTINGS =
  "seat-system/agent-settings/pages/agents/agents.agent-settings.harness-settings.json"

const DISPATCHER = "command-system/ops-calling/ops-calling.module.code.ts"

const CLIENT_MARK = "agent-settings"

const PROC = "/proc"

const DIGITS = /^\d+$/

export const HELP: CommandHelp = {
  flags: [
    { name: "--dry-run", description: "Name what is stale and cycle none of it" },
    { name: "--json", description: "Emit JSON records instead of the TSV summary" },
  ],
  examples: [
    "ops seat fleet restart",
    "ops seat fleet restart --dry-run",
    "ops seat fleet restart --json",
  ],
}

function settingsSettledAtMs(): number | null {
  const done = ran(["git", "log", "-1", "--format=%ct", "--", SETTINGS], {
    cwd: rootFor(resolveRoots(), AKASHA),
  })
  if (done.code !== 0) return null
  const seconds = Number(done.out.trim())
  return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : null
}

function clientStartedAtMs(agentId: string): number | null {
  const wanted = `AGENT_ID=${agentId}`
  for (const entry of readdirSync(PROC)) {
    if (!DIGITS.test(entry)) continue
    try {
      if (!readFileSync(`${PROC}/${entry}/cmdline`, "utf8").includes(CLIENT_MARK)) continue
      if (!readFileSync(`${PROC}/${entry}/environ`, "utf8").split("\0").includes(wanted)) continue
      return statSync(`${PROC}/${entry}`).mtimeMs
    } catch {}
  }
  return null
}

interface Reading {
  readonly name: string
  readonly agentId: string
  readonly startedAtMs: number | null
  readonly standing: "stale" | "current" | "unreadable"
}

function readFleet(settledAtMs: number): readonly Reading[] {
  return seatsPresent().map((seat) => {
    const startedAtMs = clientStartedAtMs(seat.id)
    const standing =
      startedAtMs === null ? "unreadable" : startedAtMs < settledAtMs ? "stale" : "current"
    return { name: seat.name ?? seat.id, agentId: seat.id, startedAtMs, standing }
  })
}

function cycle(name: string): string {
  const done = ran([process.execPath, `${akashaRoot()}/${DISPATCHER}`, "seat", "resume", name])
  const answered = done.out.trim()
  if (done.code !== 0) {
    const why = done.err.trim()
    return `refused: ${why === "" ? answered : why}`
  }
  const columns = answered.split("\n")[0]?.split("\t") ?? []
  return columns[columns.length - 1] ?? "restarted"
}

export default async function seatFleetRestart(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const dryRun = parsed.boolean("--dry-run")
  const json = parsed.boolean("--json")

  const settledAtMs = settingsSettledAtMs()
  if (settledAtMs === null) {
    throw operationalError(
      `no commit to ${SETTINGS} could be read, so nothing says which clients started behind it`
    )
  }

  const fleet = readFleet(settledAtMs)
  const own = process.env.AGENT_ID ?? ""
  const stale = fleet.filter((one) => one.standing === "stale")
  const ordered = [
    ...stale.filter((one) => one.agentId !== own),
    ...stale.filter((one) => one.agentId === own),
  ]

  const took = new Map<string, string>()
  if (!dryRun) {
    for (const one of ordered) took.set(one.agentId, cycle(one.name))
  }

  const records = fleet.map((one) => ({
    name: one.name,
    agentId: one.agentId,
    standing: one.standing,
    startedAtMs: one.startedAtMs,
    took: took.get(one.agentId) ?? (one.standing === "stale" ? "held" : one.standing),
  }))

  if (json) {
    process.stdout.write(`${JSON.stringify({ settledAtMs, seats: records }, null, 2)}\n`)
    return
  }
  for (const one of records) {
    process.stdout.write(`${one.name}\t${one.agentId}\t${one.took}\n`)
  }
  const unreadable = fleet.filter((one) => one.standing === "unreadable").length
  process.stdout.write(
    `${stale.length} of ${fleet.length} seat(s) behind ${SETTINGS}` +
      `${dryRun ? ", none cycled" : " cycled"}` +
      `${unreadable === 0 ? "" : `; ${unreadable} whose client could not be read, left alone`}\n`
  )
}

export const help = HELP
