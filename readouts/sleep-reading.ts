// How long Alan slept is read here, on the workstation that carries the checkout, and kept beside
// the readout the sleep was taken for. It lives outside `akasha/` because an akasha file imports no
// file outside the akasha folder, and the day's row is reached only through
// `tools/lib/tracking/day-place.ts`, the one file that says where a day is kept. What to ask and how
// to read the answer are said on the readout's own page; this file supplies the reach and nothing
// else.
//
// The row comes from `askDayByDate` rather than from a query written here, so a day moved into
// akasha is read where it moved to. This is the shape `surplus-reading.ts` beside it uses, and for
// the same reason: a reader of Alan's days that composes its own `daily-tracking` query sits outside
// the one file the migration turns.
//
// `sleepIn` reads the row, and it is why a day with no sleep stretch gives no reading rather than a
// zero. `sleep-hours` on a day is a sum over that day's own stretches, and a sum over none of them
// is absent rather than `0` — on the 134 days on disk it is absent on 69 and a literal zero on
// none. So no second field has to be consulted to tell an unlogged night from a logged one, which
// is what `surplus-hours` needs, deriving as it does through `?? 0`.
//
// The sleep itself is never printed. It says how Alan's night went, and a service log is the wrong
// place for that.
import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { sleepIn } from "@akasha/readout-system/upkeep-sleep"
import { askDayByDate } from "../tools/lib/tracking/day-place.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/upkeep-sleep/upkeep-sleep.readout.ts"

export const NOTHING_TO_TAKE =
  "no tracking day carries a sleep, so there is no reading to take. A tile showing no signal is " +
  "right where a tile showing a night Alan did not have would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const asked = await askDayByDate(getEsoDayStr(now))
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the sleep is unknown rather than nothing: ${asked.why}`
    )
  }
  const row = asked.rows[0]
  if (row === undefined) return null
  const hours = sleepIn(row.values)
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
    process.stdout.write(`a sleep was taken and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
