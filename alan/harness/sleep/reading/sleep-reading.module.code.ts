import { sleepIn } from "akasha/alan/harness/readouts/pages/upkeep-sleep/upkeep-sleep.readout.code.ts"
import {
  keepReading,
  readoutPage,
} from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import { openedDayOf } from "akasha/alan/track/daily/day-opening/day-opening.module.code.ts"
import { askDayByDate } from "akasha/alan/track/daily/day-reading/day-reading.module.code.ts"
import { rootStated } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"

export const READOUT_SLUG = "upkeep-sleep"

const NOTHING_TO_TAKE =
  "no tracking day carries a sleep, so there is no reading to take. A tile showing no signal is " +
  "right where a tile showing a night Alan did not have would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const asked = await askDayByDate(openedDayOf(resolveRoots(), now))
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the sleep is unknown rather than nothing: ${asked.why}`
    )
  }
  const row = asked.rows[0]
  if (row === undefined) return null
  const hours = sleepIn(row.values)
  if (hours === null) return null
  keepReading(root, readoutPage(root, READOUT_SLUG), hours, now)
  return hours
}

if (import.meta.main) {
  const root = rootStated(process.env) ?? process.cwd()
  try {
    const hours = await takeReading(root)
    if (hours === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`a sleep was taken and kept beside ${readoutPage(root, READOUT_SLUG)}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
