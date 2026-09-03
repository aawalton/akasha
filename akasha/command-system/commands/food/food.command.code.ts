import { readFile } from "node:fs/promises"
import { imageObjectKey } from "@akasha/object-store/object-store-key"
import { type ObjectStore, seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { getEsoDayStr, nyWallToInstant } from "@tools/lib/eso-day"
import { askComposed, pageLanding, patchPage } from "@tools/lib/page-query-client"
import { wakeDayOf } from "@tools/lib/wake-day"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"

export const LOG = "log"

export const TITLE = "--title"

export const IMAGE = "--image"

export const PLANT_GRAMS = "--plant-grams"

export const ESTIMATED_CALORIES = "--estimated-calories"

export const DATE = "--date"

export const TIME = "--time"

export const JSON_SAID = "--json"

const ACTS = [LOG]

const VALUED = new Set([TITLE, IMAGE, PLANT_GRAMS, ESTIMATED_CALORIES, DATE, TIME])

const FOOD_ENTRY_PAGE_TYPE_SLUG = "food-entry"

const FOOD_WRITER = "ops-food"

const COVER_STEP = "cover"

const NUTRITION_STEP = "nutritionPoints"

const NOTHING_MISSED = "none"

const STEM_CEILING = 100

const NOON = 12

const MAX_FOOD_ENTRIES = 5000

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const TIME_PATTERN = /^(\d{1,2}):(\d{2})$/

const NUTRITION_POINTS = "@tools/lib/daily-tracking/nutrition-points"

export type WallClock = { readonly hh: number; readonly mm: number }

export type Logged = {
  readonly act: string
  readonly title: string
  readonly image: string | undefined
  readonly plantGrams: number | undefined
  readonly estimatedCalories: number | undefined
  readonly date: string | undefined
  readonly time: WallClock | undefined
  readonly json: boolean
}

export type Read = Logged | { readonly refused: readonly string[] }

interface NutritionPoints {
  readonly rollupNutritionForDay: (dayStr: string) => Promise<unknown>
}

function acts(): string {
  return ACTS.join("`, `")
}

export function wallClockIn(raw: string): WallClock | null {
  const match = TIME_PATTERN.exec(raw)
  if (match === null) return null
  const hh = Number(match[1])
  const mm = Number(match[2])
  if (!Number.isInteger(hh) || !Number.isInteger(mm) || hh > 23 || mm > 59) return null
  return { hh, mm }
}

function nonNegative(name: string, raw: string, refusals: string[]): number | undefined {
  const held = Number(raw)
  if (!Number.isFinite(held) || held < 0) {
    refusals.push(`\`${name}\` takes a non-negative number, and \`${raw}\` is none`)
    return undefined
  }
  return held
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const words: string[] = []
  const said = new Map<string, string>()
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_SAID) {
      json = true
      continue
    }
    if (VALUED.has(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` names a value, and nothing followed it`)
        continue
      }
      said.set(one, value)
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag this takes`)
      continue
    }
    words.push(one)
  }
  const [act, ...rest] = words
  if (act === undefined) {
    return { refused: [...refusals, `this names no act — it carries \`${acts()}\``] }
  }
  if (!ACTS.includes(act)) {
    refusals.push(`\`${act}\` is no act this carries — it carries \`${acts()}\``)
  }
  for (const stray of rest.slice(1)) {
    refusals.push(`\`${stray}\` follows the food's name, and one call names one food`)
  }
  const titleSaid = said.get(TITLE)
  if (titleSaid !== undefined && rest[0] !== undefined) {
    refusals.push(
      `the food's name is said once — \`${rest[0]}\` follows the act and \`${TITLE}\` names \`${titleSaid}\``
    )
  }
  const title = titleSaid ?? rest[0]
  if (title === undefined || title === "") {
    refusals.push(
      `the food's name is said as the word after \`${LOG}\` or with \`${TITLE}\`, and neither was said`
    )
  }
  const plantGramsSaid = said.get(PLANT_GRAMS)
  const plantGrams =
    plantGramsSaid === undefined ? undefined : nonNegative(PLANT_GRAMS, plantGramsSaid, refusals)
  const caloriesSaid = said.get(ESTIMATED_CALORIES)
  const estimatedCalories =
    caloriesSaid === undefined ? undefined : nonNegative(ESTIMATED_CALORIES, caloriesSaid, refusals)
  const date = said.get(DATE)
  if (date !== undefined && !DAY_PATTERN.test(date)) {
    refusals.push(`\`${DATE}\` takes a date written YYYY-MM-DD, and \`${date}\` is none`)
  }
  const timeSaid = said.get(TIME)
  const time = timeSaid === undefined ? undefined : wallClockIn(timeSaid)
  if (timeSaid !== undefined && time === null) {
    refusals.push(`\`${TIME}\` takes a wall clock written HH:MM, and \`${timeSaid}\` is none`)
  }
  const image = said.get(IMAGE)
  if (image !== undefined && image === "") {
    refusals.push(`\`${IMAGE}\` names a path, and what followed it was empty`)
  }
  if (refusals.length > 0 || title === undefined) return { refused: refusals }
  return {
    act,
    title,
    image,
    plantGrams,
    estimatedCalories,
    date,
    time: time ?? undefined,
    json,
  }
}

export function happenedAtFrom(
  date: string | undefined,
  time: WallClock | undefined,
  now: Date
): Date {
  if (date === undefined && time === undefined) return now
  const dayStr = date ?? getEsoDayStr(now)
  const wall = time ?? { hh: NOON, mm: 0 }
  return nyWallToInstant(dayStr, wall.hh, wall.mm)
}

export function stemFor(dayStr: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const whole = slug === "" ? dayStr : `${dayStr}-${slug}`
  return whole.length <= STEM_CEILING ? whole : whole.slice(0, STEM_CEILING).replace(/-+$/, "")
}

export function freeStemIn(stem: string, slugs: readonly string[]): string {
  let taken = 0
  for (const slug of slugs) {
    if (slug === stem || slug.startsWith(`${stem}-`)) taken += 1
  }
  return taken === 0 ? stem : `${stem}-${taken + 1}`
}

async function logging(read: Logged, given: Given): Promise<Answer> {
  const happenedAtDate = happenedAtFrom(read.date, read.time, new Date())
  const happenedAt = happenedAtDate.toISOString()
  const dayStr = wakeDayOf(resolveRoots(), happenedAtDate)

  let bytes: Uint8Array | null = null
  let store: ObjectStore | null = null
  if (read.image !== undefined) {
    bytes = await readFile(read.image).catch(() => null)
    if (bytes === null || bytes.length === 0) {
      return refused(`\`${IMAGE}\` names ${read.image}, which is not there or holds nothing`, 1)
    }
    store = seaweedFSObjectStoreFromEnv()
    if (store === null) {
      return refused(
        "no object store is configured — SEAWEEDFS_S3_ENDPOINT, SEAWEEDFS_BUCKET, " +
          "SEAWEEDFS_ACCESS_KEY and SEAWEEDFS_SECRET_KEY say where one stands",
        3
      )
    }
  }

  const asked = await askComposed({
    "page-type": FOOD_ENTRY_PAGE_TYPE_SLUG,
    keys: ["slug"],
    limit: MAX_FOOD_ENTRIES,
  })
  if (!asked.ok) return refused(`the food entries standing could not be read: ${asked.why}`, 3)
  const slugs: string[] = []
  for (const row of asked.rows) {
    const slug = row.values.slug
    if (typeof slug === "string") slugs.push(slug)
  }
  const stem = freeStemIn(stemFor(dayStr, read.title), slugs)
  const foodId = Bun.randomUUIDv7()

  const written = await pageLanding(
    "write",
    FOOD_ENTRY_PAGE_TYPE_SLUG,
    stem,
    {
      id: foodId,
      title: read.title,
      slug: stem,
      "happened-at": happenedAt,
      ...(read.plantGrams === undefined ? {} : { "plant-grams": read.plantGrams }),
      ...(read.estimatedCalories === undefined
        ? {}
        : { "estimated-calories": read.estimatedCalories }),
    },
    FOOD_WRITER
  )
  if (!written.ok) return refused(`the food entry did not land as a file: ${written.why}`, 3)

  const report: string[] = []
  const notLanded: string[] = []
  const missed = (step: string, thrown: unknown, standing: string): void => {
    notLanded.push(step)
    report.push(
      `${step} did not land for food entry ${foodId}: ${whyOf(thrown)}`,
      `the entry itself is written — saying \`${given.calledAs} ${LOG}\` again would write a ` +
        `second one rather than mend this one. ${standing}`
    )
  }

  let cover: string | null = null
  if (bytes !== null && store !== null) {
    try {
      await store.put(imageObjectKey(foodId), new Uint8Array(bytes))
      cover = `/api/image/${foodId}`
      const patched = await patchPage(FOOD_ENTRY_PAGE_TYPE_SLUG, stem, { cover }, FOOD_WRITER)
      if (!patched.ok) throw new Error(patched.why)
    } catch (thrown) {
      cover = null
      missed(COVER_STEP, thrown, `The entry carries no cover; ${read.image} stands where it was.`)
    }
  }

  try {
    const nutrition: NutritionPoints = await import(NUTRITION_POINTS)
    await nutrition.rollupNutritionForDay(dayStr)
  } catch (thrown) {
    missed(
      NUTRITION_STEP,
      thrown,
      `The day's roll-up did not finish; a nutrition sync over ${dayStr} redoes the whole of it.`
    )
  }

  if (read.json) {
    report.push(
      JSON.stringify({
        id: foodId,
        title: read.title,
        happenedAt,
        day: dayStr,
        cover,
        plantGrams: read.plantGrams ?? null,
        estimatedCalories: read.estimatedCalories ?? null,
        notLanded,
      })
    )
    return { report, refusals: [], code: 0 }
  }
  report.push(
    `id\t${foodId}`,
    `title\t${read.title}`,
    `happenedAt\t${happenedAt}`,
    `day\t${dayStr}`,
    `cover\t${cover ?? "-"}`,
    `plantGrams\t${read.plantGrams ?? "-"}`,
    `estimatedCalories\t${read.estimatedCalories ?? "-"}`,
    `notLanded\t${notLanded.length === 0 ? NOTHING_MISSED : notLanded.join(",")}`
  )
  return { report, refusals: [], code: 0 }
}

export async function food(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await logging(read, given)
  } catch (thrown) {
    return refused(whyOf(thrown), 3)
  }
}
