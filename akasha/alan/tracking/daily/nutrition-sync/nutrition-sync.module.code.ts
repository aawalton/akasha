export const summary = "Recompute a day's nutritionPoints from logged food rows (1pt/gram)"

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
    { code: 0, meaning: "nutritionPoints recomputed and written" },
    { code: 1, meaning: "bad --date" },
  ],
  examples: ["ops tracking nutrition-sync", "ops tracking nutrition-sync --date 2026-06-18"],
}

export default async function trackingNutritionSync(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const dateRaw = parsed.string("--date")
  if (dateRaw !== undefined && !DAY_RE.test(dateRaw)) {
    throw inputError(`--date must be YYYY-MM-DD (got "${dateRaw}")`)
  }
  const dayStr = dateRaw ?? getEsoDayStr(new Date())

  const { rollupNutritionForDay } = await import(
    "../nutrition-points/nutrition-points.module.code.ts"
  )

  console.error(`Recomputing nutritionPoints for ${dayStr} from food rows…`)
  const { nutritionPoints: points, outcome } = await rollupNutritionForDay(dayStr)

  if (json) {
    process.stdout.write(`${JSON.stringify({ day: dayStr, nutritionPoints: points, outcome })}\n`)
    return
  }
  process.stdout.write(`day\t${dayStr}\nnutritionPoints\t${points}\noutcome\t${outcome}\n`)
}
