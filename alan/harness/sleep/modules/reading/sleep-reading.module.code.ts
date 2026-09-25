import {
  keepReading,
  readoutServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { sleepReading } from "akasha/alan/harness/sleep/modules/reading/sleep-reading.module.ts"
import { sleepIn } from "akasha/alan/harness/sleep/readouts/upkeep-sleep/upkeep-sleep.readout.reading.code.ts"
import { openedDayOf } from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { askDayByDate } from "akasha/alan/track/daily/modules/day-reading/day-reading.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { resolveRoots } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const SERVED_BY = namedAs(module.slug, sleepReading.slug, null)

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
  keepReading(root, readoutServedBy(root, SERVED_BY), hours, now)
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
    process.stdout.write(`a sleep was taken and kept beside ${readoutServedBy(root, SERVED_BY)}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
