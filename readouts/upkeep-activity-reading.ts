// The calories Alan's day has burned are read here, on the workstation that carries the checkout,
// and kept beside the readout the activity was taken for. It lives outside `akasha/` because an
// akasha file imports no file outside the akasha folder, and the day's row is reached only through
// `tools/lib/tracking/day-place.ts`, the one file that says where a day is kept. What to ask and
// how to read the answer are said on the readout's own page; this file supplies the reach and
// nothing else.
//
// The row comes from `askDayByDate` rather than from a query written here, so a day moved into
// akasha is read where it moved to. This is the same reach `surplus-reading.ts` takes, for the
// same reason.
//
// `activityIn` reads the row, and it is akasha's own guard: a day carrying neither the cardio half
// nor the lifting half is no reading rather than an activity of zero. That guard is why this file
// exists in the shape it does. The markdown pages derive `activity-calories` as
// `({active-calories} ?? 0) + ({strength-calories} ?? 0)`, which answers zero for a day that
// recorded neither — a colored rung on a tile that ought to be dark. The two halves are added in
// akasha instead, where the absent case is a null.
//
// The cardio half is rolled onto the day by the health-sample rollup rather than read from samples
// here. A day whose samples never arrived carries no cardio half, and this takes no reading for it.
//
// The activity itself is never printed. It says what Alan's body did today, and a service log is
// the wrong place for that.
import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { activityIn } from "@akasha/readout-system/upkeep-activity"
import { askDayByDate } from "../tools/lib/tracking/day-place.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/upkeep-activity/upkeep-activity.readout.ts"

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
