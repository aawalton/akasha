// The surplus Alan's day has left of his night is read here, on the workstation that carries the
// checkout, and kept beside the readout the surplus was taken for. It lives outside `akasha/`
// because an akasha file imports no file outside the akasha folder, and the day's row is reached
// only through `tools/lib/tracking/day-place.ts`, the one file that says where a day is kept.
// What to ask and how to read the answer are said on the readout's own page; this file supplies
// the reach and nothing else.
//
// The row comes from `askDayByDate` rather than from a query written here, so a day moved into
// akasha is read where it moved to. This file used to hand `askComposed` and a day string to
// `fetchSurplusHours`, which composed its own `daily-tracking` query out of sight of the funnel.
// The two queries were the same query, so nothing was wrong today; what was wrong is that a
// reader of Alan's days sat outside the one file the migration turns.
//
// `surplusIn` reads the row, and it is the reason a day with no stretches gives no reading rather
// than a zero. `surplus-hours` derives from `({sleep-hours} ?? 0) - ({spend-hours} ?? 0)`, and
// where the day holds neither that is `0` — a healthy rung, on a tile that ought to be dark.
//
// The surplus itself is never printed. It says how much of Alan's night his day has eaten, and a
// service log is the wrong place for that.
import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { surplusIn } from "@akasha/readout-system/upkeep-surplus"
import { askDayByDate } from "../tools/lib/tracking/day-place.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/upkeep-surplus/upkeep-surplus.readout.ts"

export const NOTHING_TO_TAKE =
  "no tracking day carries a surplus, so there is no reading to take. A tile showing no signal is " +
  "right where a tile showing hours Alan does not have would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const asked = await askDayByDate(getEsoDayStr(now))
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the surplus is unknown rather than nothing: ${asked.why}`
    )
  }
  const row = asked.rows[0]
  if (row === undefined) return null
  const hours = surplusIn(row.values)
  if (hours === null) return null
  keepReading(root, READOUT_PAGE, hours, now)
  return hours
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const hours = await takeReading(root)
    if (hours === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`a surplus was taken and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
