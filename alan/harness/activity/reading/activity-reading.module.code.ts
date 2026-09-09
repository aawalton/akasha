import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { activityIn } from "akasha/readouts/pages/upkeep-activity/upkeep-activity.readout.code.ts"
import { keepReading } from "akasha/readouts/reading/readout-reading.module.code.ts"
import { askDayByDate } from "../../../track/daily/day-reading/day-reading.module.code.ts"

export const READOUT_PAGE = "readouts/pages/upkeep-activity/upkeep-activity.readout.ts"

export const NOTHING_TO_TAKE =
  "no tracking day carries an activity, so there is no reading to take. A tile showing no signal " +
  "is right where a tile showing calories Alan did not burn would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const asked = await askDayByDate(getEsoDayStr(now))
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the activity is unknown rather than nothing: ${asked.why}`
    )
  }
  const row = asked.rows[0]
  if (row === undefined) return null
  const calories = activityIn(row.values)
  if (calories === null) return null
  keepReading(root, READOUT_PAGE, calories, now)
  return calories
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const calories = await takeReading(root)
    if (calories === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`an activity was taken and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
