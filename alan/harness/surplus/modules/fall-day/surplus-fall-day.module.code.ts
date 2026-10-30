import { sleepIn } from "akasha/alan/harness/sleep/readouts/upkeep-sleep/upkeep-sleep.readout.reading.code.ts"
import { surplusIn } from "akasha/alan/harness/surplus/readouts/upkeep-surplus/upkeep-surplus.readout.reading.code.ts"
import { dayValuesByDate } from "akasha/alan/track/daily/modules/day-reading/day-reading.module.code.ts"

export async function readReading(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day)
  if (values === null) return null
  return surplusIn(values)
}

export async function readSleepHours(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day)
  if (values === null) return null
  return sleepIn(values)
}
