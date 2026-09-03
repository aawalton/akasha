// The stress capacity Alan has in hand is read here, on the workstation that carries the checkout,
// and kept beside the readout the capacity was taken for. It lives outside `akasha/` because an
// akasha file imports no file outside the akasha folder, and a day and the stretches beside it are
// reached only through `tools/lib/tracking/day-place.ts`, the one file that says where a day is
// kept. What to ask and how to read the answer are said on the readout's own page; this file
// supplies the reach and nothing else.
//
// Capacity is not read where the surplus is read, and that is the one thing worth knowing about
// this file. The surplus is a single key on the day row. `daily-tracking` declares no capacity key
// at all — checked against the fifty-two `daily-tracking-*` property definitions, none of which is
// a capacity — so there is no day row to read it off. It is `health-capacity-hours` on each
// `session-tracking` row filed beside the day, summed. That key is itself worked out, from how long
// a stretch ran times what an hour of that stretch was worth, so the store computes it and the sum
// is the only arithmetic here.
//
// The day is asked for first because the stretches are filed under the day's id rather than under
// its date. Two reads rather than one, and the first answering nothing is a day nobody has opened,
// which is no reading rather than a capacity of zero.
//
// `sessionsOfDay` hands its rows back with their keys camelized, while `capacityIn` is written
// against the spelling the store keeps, so the one key it reads is spelled back for it here. The
// guard itself is akasha's own and is not rewritten: a stretch carrying no capacity is left out of
// the sum, and a day where that leaves nothing at all is no reading. Zero is a healthy rung on this
// scale, so a day nobody logged would otherwise show green.
//
// The capacity itself is never printed. It says how much Alan has left in him, and a service log is
// the wrong place for that.
import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { capacityHoursOf, capacityIn } from "@akasha/readout-system/upkeep-capacity"
import { dayValuesByDate, sessionsOfDay } from "../tools/lib/tracking/day-place.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readouts/pages/upkeep-capacity/upkeep-capacity.readout.ts"

const HEALTH_CAPACITY_HOURS = "health-capacity-hours"

const ID = "id"

// The keys a stretch declares, which are what the capacity is worked out from. The store used to
// work it out and hand it over under `health-capacity-hours`, through a page-property-definition
// expression the markdown engine evaluated over `recovery-multiplier`, `cost-multiplier` and
// `safety-gap`. A stretch in akasha is a row of the `sessions` entry beside its day and declares no
// such key, and nothing wires akasha's expression engine into its asking, so asking for it is
// refused rather than answered with rows the key is absent from. `capacityHoursOf` is akasha's own
// and holds the arithmetic unchanged.
const STRETCH_KEYS = ["title", "start-time", "end-time", "safety-level", "difficulty-level"] as const

// `sessionsOfDay` camelizes what it answers with, and `capacityHoursOf` is written against the
// spelling the store keeps, so the keys it reads are spelled back for it here.
const AS_THE_STORE_ANSWERS: Readonly<Record<string, string>> = {
  title: "title",
  "start-time": "startTime",
  "end-time": "endTime",
  "safety-level": "safetyLevel",
  "difficulty-level": "difficultyLevel",
}

function spelledForTheStore(one: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> {
  const held: Record<string, unknown> = {}
  for (const [kept, answered] of Object.entries(AS_THE_STORE_ANSWERS)) held[kept] = one[answered]
  return held
}

export const NOTHING_TO_TAKE =
  "no stretch of the day carries a capacity, so there is no reading to take. A tile showing no " +
  "signal is right where a tile showing capacity Alan does not have would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const day = await dayValuesByDate(getEsoDayStr(now), [ID])
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
    process.stdout.write(`a capacity was taken and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
