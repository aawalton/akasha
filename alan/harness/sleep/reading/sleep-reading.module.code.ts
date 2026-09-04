import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { sleepIn } from "@akasha/readout-system/upkeep-sleep"
import { askDayByDate } from "../../../tracking/daily/day-place/day-place.module.code.ts"

export const READOUT_PAGE =
  "readout-system/readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts"

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
