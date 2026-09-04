export const summary =
  "Recompute a day's taskPoints from completed health tasks (difficulty-tier points)"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { getEsoDayStr } from "@akasha/day/eso-day"
import { inputError } from "@akasha/errors-core/exit-code"

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/

export const help: CommandHelp = {
  flags: [
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "ESO day to recompute (default today)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "taskPoints recomputed and written" },
    { code: 1, meaning: "bad --date" },
  ],
  examples: ["ops tracking task-sync", "ops tracking task-sync --date 2026-06-18"],
}

export default async function trackingTaskSync(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const dateRaw = parsed.string("--date")
  if (dateRaw !== undefined && !DAY_RE.test(dateRaw)) {
    throw inputError(`--date must be YYYY-MM-DD (got "${dateRaw}")`)
  }
  const dayStr = dateRaw ?? getEsoDayStr(new Date())

  const { rollupHealthTaskPointsForDay } = await import("../task-points/task-points.module.code.ts")

  console.error(`Recomputing taskPoints for ${dayStr} from completed health tasks…`)
  const { taskPoints: points, outcome } = await rollupHealthTaskPointsForDay(dayStr)

  if (json) {
    process.stdout.write(`${JSON.stringify({ day: dayStr, taskPoints: points, outcome })}\n`)
    return
  }
  process.stdout.write(`day\t${dayStr}\ntaskPoints\t${points}\noutcome\t${outcome}\n`)
}
