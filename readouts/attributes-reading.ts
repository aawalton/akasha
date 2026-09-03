// The six attribute points Alan earned today are read here, on the workstation that carries the
// checkout, and each is kept beside the readout it was taken for. It lives outside `akasha/`
// because an akasha file imports no file outside the akasha folder, and a day, the stretches filed
// beside it and the hour Alan rose are reached only through `tools/lib/tracking/day-place.ts` and
// `tools/lib/wake-day.ts`. What to ask and how to read each answer are said on each readout's own
// page; this file supplies the reach and nothing else.
//
// Six readouts, three sources, so this takes the shape `inbox-reading.ts` takes rather than the
// one-file-per-tile shape the upkeep readings take. Four of the six — strength, endurance, wisdom
// and intelligence — are four keys on the one `daily-tracking` row, and asking for that row four
// times over would be four queries for one answer.
//
// Charisma waits on the day read rather than running beside it. The stretches are filed under the
// day's id, so without the day there is no id to ask under: the two are not independent, and
// settling them as though they were would buy a second day query and nothing else.
//
// Constitution is the third source and is not on the day at all. It is the plant grams of every
// food entry inside the window from the hour Alan rose to the hour he rises next — the same sum
// the plants tile shows, at a hundred grams to the point. The day carries a `nutrition-points`
// figure rolled up from that same sum, and this does not read it: a rollup is only as fresh as its
// last run, and four days in August still carry the residue of food entries that have since been
// deleted. Counting the entries cannot go stale that way.
//
// A source that cannot be read stops its own readings and no other. Five kept and one missing is
// right: a readout with no fresh reading answers an empty ring rather than dropping out of the
// group, so Alan sees six rings with the gap showing in one of them. Only a run that kept nothing
// exits 2.
//
// A source that could not be read is named on stderr with the reason it gave, because the tile it
// feeds is left standing on the number taken before and nothing downstream can tell that from a
// reading taken now. The exit code is not what carries this: a run that kept five of six has done
// what it could, so it still exits 0, and the naming is what makes the sixth visible. A day that
// nobody has opened yet is not named here — that is an absent reading rather than an unreachable
// source, and it is what a dark tile is for.
//
// Wisdom and intelligence take no reading yet. Nothing writes `wisdom-words` or
// `intelligence-words` onto a day, so each is no reading rather than a zero, and the tile is dark.
// That is true, and it is what Alan asked for: points are counted forward from the day an
// attribute begins and no earlier day is backfilled.
//
// The points themselves are never printed. They say what Alan did and did not do today, and a
// service log is the wrong place for that.
import { getEsoDayStr } from "@akasha/day/eso-day"
import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { charismaIn } from "@akasha/readout-system/attribute-charisma"
import { fetchConstitutionPoints } from "@akasha/readout-system/attribute-constitution"
import { enduranceIn } from "@akasha/readout-system/attribute-endurance"
import { intelligenceIn } from "@akasha/readout-system/attribute-intelligence"
import { strengthIn } from "@akasha/readout-system/attribute-strength"
import { wisdomIn } from "@akasha/readout-system/attribute-wisdom"
import type { Row } from "@akasha/readout-system/readout-asking"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { askDayByDate, sessionsOfDay } from "../tools/lib/tracking/day-place.ts"
import { wakeDayOf, wakeDayWindow } from "../tools/lib/wake-day.ts"
import { askingIn } from "./plants-reading.ts"

const READOUTS = "akasha/readout-system/readouts/pages"

export const STRENGTH_PAGE = `${READOUTS}/attribute-strength/attribute-strength.readout.ts`

export const ENDURANCE_PAGE = `${READOUTS}/attribute-endurance/attribute-endurance.readout.ts`

export const CONSTITUTION_PAGE = `${READOUTS}/attribute-constitution/attribute-constitution.readout.ts`

export const WISDOM_PAGE = `${READOUTS}/attribute-wisdom/attribute-wisdom.readout.ts`

export const INTELLIGENCE_PAGE = `${READOUTS}/attribute-intelligence/attribute-intelligence.readout.ts`

export const CHARISMA_PAGE = `${READOUTS}/attribute-charisma/attribute-charisma.readout.ts`

const ID = "id"

/**
 * The stretch keys `charismaIn` reads, in the store's own spelling, beside the spelling
 * `sessionsOfDay` hands them back under.
 *
 * `sessionsOfDay` camelizes what it answers with, and the guard itself is akasha's own and is not
 * rewritten, so the four keys are spelled back for it here. This is the same turn
 * `capacity-reading.ts` makes for its one key.
 */
const AS_THE_STORE_ANSWERS: Readonly<Record<string, string>> = {
  "safety-level": "safetyLevel",
  "difficulty-level": "difficultyLevel",
  "start-time": "startTime",
  "end-time": "endTime",
}

const STRETCH_KEYS = Object.keys(AS_THE_STORE_ANSWERS)

export const NOTHING_TO_TAKE =
  "no attribute could be read, so there is no reading to take. A tile showing no signal is right " +
  "where a tile showing points Alan did not earn would be a lie."

export type Taken = {
  readonly kept: Readonly<Record<string, number>>
  readonly unread: readonly string[]
}

function whyOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

async function trackedDay(day: string): Promise<Readonly<Record<string, unknown>> | null> {
  const asked = await askDayByDate(day)
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so its attributes are unknown rather than nothing: ${asked.why}`
    )
  }
  return asked.rows[0]?.values ?? null
}

function spelledBack(stretch: Readonly<Record<string, unknown>>): Row {
  const values: Record<string, unknown> = {}
  for (const [kept, answered] of Object.entries(AS_THE_STORE_ANSWERS)) {
    values[kept] = stretch[answered]
  }
  return { values }
}

/** The hours of the day's stretches Alan was at ease over, or nothing where the day names no id. */
async function charismaOf(day: Readonly<Record<string, unknown>>): Promise<number | null> {
  const dayId = day[ID]
  if (typeof dayId !== "string" || dayId.trim() === "") return null
  const stretches = await sessionsOfDay(dayId, STRETCH_KEYS)
  return charismaIn(stretches.map(spelledBack))
}

/**
 * The points of the whole plants eaten since Alan rose, counted over the window he rose in.
 *
 * Asked through `asking` rather than through the markdown query client that stood here. That
 * client still recognises `food-entry` but enumerates none of its files, so it answered no rows
 * without refusing, and this tile read zero constitution every five minutes while 87 food entries
 * stood in akasha.
 */
function constitutionOf(now: Date): Promise<number> {
  const here = resolveRoots()
  const window = wakeDayWindow(here, wakeDayOf(here, now))
  const checkout = (here as unknown as Readonly<Record<string, string>>)[AKASHA]
  if (checkout === undefined || checkout === "") {
    throw new Error(
      "no akasha checkout stands here, so the plants Alan ate are unknown rather than none"
    )
  }
  return fetchConstitutionPoints(askingIn(checkout), window.from, window.to)
}

/**
 * Every attribute this run could read, keyed by the page each reading was kept beside, beside
 * every readout a source refused it and why.
 *
 * A source that throws leaves its own readouts out and lets the rest through, since one
 * unreachable source is no reason to drop the attributes that answered. What it does not do is
 * pass silently: the readouts that source fed are named in `unread`, because the points standing
 * beside them are the ones taken before.
 */
export async function takeReadings(root: string, now: Date = new Date()): Promise<Taken> {
  const kept: Record<string, number> = {}
  const unread: string[] = []
  const keep = (page: string, value: number | null): undefined => {
    if (value === null) return undefined
    keepReading(root, page, value, now)
    kept[page] = value
    return undefined
  }
  const wanting = (pages: readonly string[], why: string): undefined => {
    for (const page of pages) unread.push(`${page} — ${why}`)
    return undefined
  }

  const [day, constitution] = await Promise.allSettled([
    trackedDay(getEsoDayStr(now)),
    constitutionOf(now),
  ])

  if (constitution.status === "fulfilled") keep(CONSTITUTION_PAGE, constitution.value)
  else wanting([CONSTITUTION_PAGE], whyOf(constitution.reason))

  if (day.status === "rejected") {
    wanting(
      [STRENGTH_PAGE, ENDURANCE_PAGE, WISDOM_PAGE, INTELLIGENCE_PAGE, CHARISMA_PAGE],
      whyOf(day.reason)
    )
  } else if (day.value !== null) {
    const values = day.value
    keep(STRENGTH_PAGE, strengthIn(values))
    keep(ENDURANCE_PAGE, enduranceIn(values))
    keep(WISDOM_PAGE, wisdomIn(values))
    keep(INTELLIGENCE_PAGE, intelligenceIn(values))

    const [charisma] = await Promise.allSettled([charismaOf(values)])
    if (charisma.status === "fulfilled") keep(CHARISMA_PAGE, charisma.value)
    else wanting([CHARISMA_PAGE], whyOf(charisma.reason))
  }

  return { kept, unread }
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const taken = await takeReadings(root)
    for (const one of taken.unread) process.stderr.write(`${one}\n`)
    const pages = Object.keys(taken.kept)
    if (pages.length === 0) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(
      `${pages.length} attribute readings were taken and kept beside their pages\n`
    )
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
