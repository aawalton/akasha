import {
  capacityHoursOf,
  capacityIn,
} from "akasha/alan/harness/capacity/modules/hours/capacity-hours.computed-property-module.code.ts"
import { capacityReading } from "akasha/alan/harness/capacity/modules/reading/capacity-reading.module.ts"
import {
  keepReading,
  readoutServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { openedDayOf } from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { dayValuesByDate } from "akasha/alan/track/daily/modules/day-reading/day-reading.module.code.ts"
import { sessionsOfDay } from "akasha/alan/track/daily/modules/day-stretches/day-stretches.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { resolveRoots } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const SERVED_BY = namedAs(module.slug, capacityReading.slug, null)

const HEALTH_CAPACITY_HOURS = "health-capacity-hours"

const ID = "id"

const STRETCH_KEYS = [
  "title",
  "started-at",
  "ended-at",
  "safety-level",
  "difficulty-level",
] as const

const AS_THE_STORE_ANSWERS: Readonly<Record<string, string>> = {
  title: "title",
  "started-at": "startedAt",
  "ended-at": "endedAt",
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

const NO_CAPACITY_YET = 0

async function capacityOn(day: string, now: Date): Promise<number | null> {
  const values = await dayValuesByDate(day, [ID])
  const dayId = values?.[ID]
  if (typeof dayId !== "string" || dayId.trim() === "") return null

  const stretches = await sessionsOfDay(dayId, STRETCH_KEYS)
  return capacityIn(
    stretches.map((one) => ({
      values: { [HEALTH_CAPACITY_HOURS]: capacityHoursOf(spelledForTheStore(one), now) },
    }))
  )
}

export async function takeReading(root: string, now: Date = new Date()): Promise<number> {
  const hours = (await capacityOn(openedDayOf(resolveRoots(), now), now)) ?? NO_CAPACITY_YET
  keepReading(root, readoutServedBy(root, SERVED_BY), hours, now)
  return hours
}

if (import.meta.main) {
  const root = rootStated(process.env) ?? process.cwd()
  try {
    await takeReading(root)
    process.stdout.write(
      `a capacity was taken and kept beside ${readoutServedBy(root, SERVED_BY)}\n`
    )
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
