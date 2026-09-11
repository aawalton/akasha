import {
  capacityHoursOf,
  capacityIn,
} from "akasha/alan/harness/readouts/pages/upkeep-capacity/upkeep-capacity.readout.code.ts"
import {
  keepReading,
  readoutPage,
} from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import { openedDayOf } from "akasha/alan/track/daily/day-opening/day-opening.module.code.ts"
import { dayValuesByDate } from "akasha/alan/track/daily/day-reading/day-reading.module.code.ts"
import { sessionsOfDay } from "akasha/alan/track/daily/day-stretches/day-stretches.module.code.ts"
import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export const READOUT_SLUG = "upkeep-capacity"

const HEALTH_CAPACITY_HOURS = "health-capacity-hours"

const ID = "id"

const STRETCH_KEYS = [
  "title",
  "start-time",
  "end-time",
  "safety-level",
  "difficulty-level",
] as const

const AS_THE_STORE_ANSWERS: Readonly<Record<string, string>> = {
  title: "title",
  "start-time": "startTime",
  "end-time": "endTime",
  "safety-level": "safetyLevel",
  "difficulty-level": "difficultyLevel",
}

function spelledForTheStore(
  one: Readonly<Record<string, unknown>>
): Readonly<Record<string, unknown>> {
  const held: Record<string, unknown> = {}
  for (const [kept, answered] of Object.entries(AS_THE_STORE_ANSWERS)) held[kept] = one[answered]
  return held
}

export const NOTHING_TO_TAKE =
  "no stretch of the day carries a capacity, so there is no reading to take. A tile showing no " +
  "signal is right where a tile showing capacity Alan does not have would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const day = await dayValuesByDate(openedDayOf(resolveRoots(), now), [ID])
  if (day === null) return null
  const dayId = day[ID]
  if (typeof dayId !== "string" || dayId.trim() === "") return null

  const stretches = await sessionsOfDay(dayId, STRETCH_KEYS)
  const hours = capacityIn(
    stretches.map((one) => ({
      values: { [HEALTH_CAPACITY_HOURS]: capacityHoursOf(spelledForTheStore(one)) },
    }))
  )
  if (hours === null) return null

  keepReading(root, readoutPage(root, READOUT_SLUG), hours, now)
  return hours
}

if (import.meta.main) {
  const root = optionalEnv("AKASHA_ROOT") ?? process.cwd()
  try {
    const hours = await takeReading(root)
    if (hours === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(
      `a capacity was taken and kept beside ${readoutPage(root, READOUT_SLUG)}\n`
    )
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
