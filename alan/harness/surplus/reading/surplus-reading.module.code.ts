import { keepReading } from "@akasha/readouts/readout-reading"
import { surplusIn } from "@akasha/readouts/upkeep-surplus"
import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { askDayByDate } from "../../../track/daily/day-reading/day-reading.module.code.ts"

export const READOUT_PAGE = "readouts/pages/upkeep-surplus/upkeep-surplus.readout.ts"

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
