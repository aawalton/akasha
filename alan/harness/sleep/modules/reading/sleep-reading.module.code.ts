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

const NO_SLEEP_YET = 0

export async function takeReading(root: string, now: Date = new Date()): Promise<number> {
  const asked = await askDayByDate(openedDayOf(resolveRoots(), now))
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the sleep is unknown rather than nothing: ${asked.why}`
    )
  }
  const row = asked.rows[0]
  const hours = (row === undefined ? null : sleepIn(row.values)) ?? NO_SLEEP_YET
  keepReading(root, readoutServedBy(root, SERVED_BY), hours, now)
  return hours
}

if (import.meta.main) {
  const root = rootStated(process.env) ?? process.cwd()
  try {
    await takeReading(root)
    process.stdout.write(`a sleep was taken and kept beside ${readoutServedBy(root, SERVED_BY)}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
