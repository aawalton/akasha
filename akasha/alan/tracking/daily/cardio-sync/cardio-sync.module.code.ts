export const summary = "Recompute a day's activeCalories from the health samples Alan's watch sent"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { getEsoDayStr } from "@akasha/day/eso-day"
import { inputError } from "@akasha/errors-core/exit-code"
import { rollupActiveCaloriesForDay } from "../day-active-calories/day-active-calories.module.code.ts"

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
    { code: 0, meaning: "activeCalories recomputed, and written unless unmeasured" },
    { code: 1, meaning: "bad --date" },
  ],
  examples: ["ops tracking cardio-sync", "ops tracking cardio-sync --date 2026-08-18"],
}

export default async function trackingCardioSync(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const dateRaw = parsed.string("--date")
  if (dateRaw !== undefined && !DAY_RE.test(dateRaw)) {
    throw inputError(`--date must be YYYY-MM-DD (got "${dateRaw}")`)
  }
  const dayStr = dateRaw ?? getEsoDayStr(new Date())

  console.error(`Recomputing activeCalories for ${dayStr} from health samples…`)
  const { activeCalories, outcome } = await rollupActiveCaloriesForDay(dayStr)

  if (json) {
    process.stdout.write(`${JSON.stringify({ day: dayStr, activeCalories, outcome })}\n`)
    return
  }
  process.stdout.write(
    `day\t${dayStr}\nactiveCalories\t${activeCalories ?? "-"}\noutcome\t${outcome}\n`
  )
}
