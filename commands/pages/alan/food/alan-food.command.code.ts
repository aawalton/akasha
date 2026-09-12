import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { getMountainMorningDayStr } from "akasha/alan/harness/day/mountain-day/mountain-day.module.code.ts"
import { readMountainWallTime } from "akasha/alan/harness/day/mountain-wall/mountain-wall.module.code.ts"
import { pad2 } from "akasha/alan/harness/day/string/day-string.module.code.ts"
import { rootOf, written } from "akasha/alan/track/daily/akasha-day/akasha-day.module.code.ts"
import { openedDayOf } from "akasha/alan/track/daily/day-opening/day-opening.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { date as dateArgument } from "akasha/commands/arguments/pages/date.argument.ts"
import { estimatedCalories as caloriesArgument } from "akasha/commands/arguments/pages/estimated-calories.argument.ts"
import { image as imageArgument } from "akasha/commands/arguments/pages/image.argument.ts"
import { json as jsonArgument } from "akasha/commands/arguments/pages/json.argument.ts"
import { plantGrams as gramsArgument } from "akasha/commands/arguments/pages/plant-grams.argument.ts"
import { time as timeArgument } from "akasha/commands/arguments/pages/time.argument.ts"
import { title as titleArgument } from "akasha/commands/arguments/pages/title.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { alanFood as page } from "akasha/commands/pages/alan/food/alan-food.command.ts"
import { imageObjectKey } from "akasha/infrastructure/storage/object-store/key/object-store-key.module.code.ts"
import {
  type ObjectStore,
  seaweedFSObjectStoreFromEnv,
} from "akasha/infrastructure/storage/object-store/seaweedfs-store/seaweedfs-store.module.code.ts"
import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { STEM_CEILING } from "akasha/pages/naming/named-for/page-stem/page-stem.module.code.ts"
import { asking } from "akasha/pages/service/page-asking/page-asking.module.code.ts"
import { composedFor } from "akasha/pages/service/page-composing/page-composing.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const NAMED = [
  jsonArgument,
  titleArgument,
  imageArgument,
  gramsArgument,
  caloriesArgument,
  dateArgument,
  timeArgument,
] as const

const FOOD_ENTRY_PAGE_TYPE_SLUG = "food-entry"

const SLUG_OPENING = `${FOOD_ENTRY_PAGE_TYPE_SLUG}-`

const SLUG = "slug"

const FOOD_WRITER = "ops-food"

const COVER_STEP = "cover"

const NUTRITION_STEP = "nutritionPoints"

const NOTHING_MISSED = "none"

const STEM_HOLDS = STEM_CEILING - SLUG_OPENING.length

const NOON = 12

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const TIME_PATTERN = /^(\d{1,2}):(\d{2})$/

const NUTRITION_POINTS = "nutrition-points"

const MODULE = "module"

const CODE = "code"

const TS = "ts"

export type WallClock = { readonly hh: number; readonly mm: number }

export type Logged = {
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

type Landed =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string }

export function wallClockIn(raw: string): WallClock | null {
  const match = TIME_PATTERN.exec(raw)
  if (match === null) return null
  const hh = Number(match[1])
  const mm = Number(match[2])
  if (!Number.isInteger(hh) || !Number.isInteger(mm) || hh > 23 || mm > 59) return null
  return { hh, mm }
}

export function readIn(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const taken = read.taken
  const refusals: string[] = []
  const said = taken.date
  if (said !== undefined && !DAY_PATTERN.test(said)) {
    refusals.push(
      `\`${dateArgument.said}\` takes a date written YYYY-MM-DD, and \`${said}\` is none`
    )
  }
  const clock = taken.time === undefined ? undefined : wallClockIn(taken.time)
  if (taken.time !== undefined && clock === null) {
    refusals.push(
      `\`${timeArgument.said}\` takes a wall clock written HH:MM, and \`${taken.time}\` is none`
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return {
    title: taken.title,
    image: taken.image,
    plantGrams: taken.plantGrams,
    estimatedCalories: taken.estimatedCalories,
    date: said,
    time: clock ?? undefined,
    json: taken.json,
  }
}

export type HappenedAtRead = { readonly at: Date } | { readonly refused: string }

export function happenedAtFrom(
  date: string | undefined,
  time: WallClock | undefined,
  now: Date
): HappenedAtRead {
  if (date === undefined && time === undefined) return { at: now }
  const dayStr = date ?? getMountainMorningDayStr(now)
  const wall = time ?? { hh: NOON, mm: 0 }
  const reading = readMountainWallTime(`${dayStr} ${pad2(wall.hh)}:${pad2(wall.mm)}`, now)
  if (reading.read === "refused") return { refused: reading.saying }
  return { at: reading.at }
}

function shortenedTo(whole: string, ceiling: number): string {
  return whole.length <= ceiling ? whole : whole.slice(0, ceiling).replace(/-+$/, "")
}

export function stemFor(dayStr: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const whole = slug === "" ? dayStr : `${dayStr}-${slug}`
  return shortenedTo(whole, STEM_HOLDS)
}

export function stemOfSlug(slug: string): string {
  return slug.startsWith(SLUG_OPENING) ? slug.slice(SLUG_OPENING.length) : slug
}

export function slugOfStem(stem: string): string {
  return `${SLUG_OPENING}${stem}`
}

export function freeStemIn(stem: string, slugs: readonly string[]): string {
  let taken = 0
  for (const slug of slugs) {
    if (slug === stem || slug.startsWith(`${stem}-`)) taken += 1
  }
  if (taken === 0) return stem
  const numbered = `-${taken + 1}`
  return `${shortenedTo(stem, STEM_HOLDS - numbered.length)}${numbered}`
}

export type Stems = { readonly stems: readonly string[] } | { readonly refused: string }

function stemsThere(root: string): Stems {
  const asked = asking(root, { pageTypeSlug: FOOD_ENTRY_PAGE_TYPE_SLUG, keys: [SLUG] })
  if ("refused" in asked) return { refused: asked.refused }
  const stems: string[] = []
  for (const row of asked.rows) {
    const slug = row[SLUG]
    if (typeof slug === "string") stems.push(stemOfSlug(slug))
  }
  return { stems }
}

async function landFoodEntry(root: string, slug: string, values: Value): Promise<Landed> {
  const composed = composedFor(root, {
    pageTypeSlug: FOOD_ENTRY_PAGE_TYPE_SLUG,
    slug,
    values,
  })
  if ("refused" in composed) return { ok: false, why: composed.refused }
  if (composed.kept !== null) {
    return {
      ok: false,
      why:
        `\`${FOOD_ENTRY_PAGE_TYPE_SLUG}\` declares a property kept outside the commit and this ` +
        `writes none; ${composed.kept.path} would carry ` +
        Object.keys(composed.kept.values).join(", "),
    }
  }
  return written([composed.put], `${FOOD_WRITER}: the food entry ${slug}`)
}

export type Kept = { readonly done: string[]; readonly report: string[] }

export type Logging = (read: Logged, given: Given, kept: Kept) => Promise<Answer>

async function logged(read: Logged, given: Given, kept: Kept): Promise<Answer> {
  const happenedAtRead = happenedAtFrom(read.date, read.time, new Date())
  if ("refused" in happenedAtRead) return refused(happenedAtRead.refused, INPUT)
  const happenedAtDate = happenedAtRead.at
  const happenedAt = happenedAtDate.toISOString()
  const dayStr = openedDayOf(resolveRoots(), happenedAtDate)
  const root = rootOf()

  let bytes: Uint8Array | null = null
  let store: ObjectStore | null = null
  if (read.image !== undefined) {
    bytes = await readFile(read.image).catch(() => null)
    if (bytes === null || bytes.length === 0) {
      return refused(
        `\`${imageArgument.said}\` names ${read.image}, which is not there or holds nothing`,
        INPUT
      )
    }
    store = seaweedFSObjectStoreFromEnv()
    if (store === null) {
      return refused(
        "no object store is configured — SEAWEEDFS_S3_ENDPOINT, SEAWEEDFS_BUCKET, " +
          "SEAWEEDFS_ACCESS_KEY and SEAWEEDFS_SECRET_KEY say where one is",
        OPERATIONAL
      )
    }
  }

  const held = stemsThere(root)
  if ("refused" in held) {
    return refused(`the food entries already filed could not be read: ${held.refused}`, DATA)
  }
  const stem = freeStemIn(stemFor(dayStr, read.title), held.stems)
  const slug = slugOfStem(stem)
  const foodId = Bun.randomUUIDv7()
  const values: Value = {
    id: foodId,
    type: FOOD_ENTRY_PAGE_TYPE_SLUG,
    slug,
    title: read.title,
    happenedAt,
    ...(read.plantGrams === undefined ? {} : { plantGrams: read.plantGrams }),
    ...(read.estimatedCalories === undefined ? {} : { estimatedCalories: read.estimatedCalories }),
  }

  const landed = await landFoodEntry(root, slug, values)
  if (!landed.ok)
    return refused(`the food entry did not land as a page: ${landed.why}`, OPERATIONAL)
  kept.done.push(`wrote the food entry ${slug}, id ${foodId}`)

  const report = kept.report
  const notLanded: string[] = []
  const missed = (step: string, thrown: unknown, after: string): undefined => {
    notLanded.push(step)
    report.push(
      `${step} did not land for food entry ${foodId}: ${whyOf(thrown)}`,
      `the entry itself is written — saying \`${given.calledAs}\` again would write a ` +
        `second one rather than mend this one. ${after}`
    )
  }

  let cover: string | null = null
  if (bytes !== null && store !== null) {
    try {
      await store.put(imageObjectKey(foodId), new Uint8Array(bytes))
      kept.done.push(`put the cover for ${foodId} in the object store`)
      cover = `/api/image/${foodId}`
      const patched = await landFoodEntry(root, slug, { ...values, cover })
      if (!patched.ok) throw new Error(patched.why)
      kept.done.push(`wrote that cover onto ${slug}`)
    } catch (thrown) {
      cover = null
      missed(COVER_STEP, thrown, `The entry carries no cover; ${read.image} is where it was.`)
    }
  }

  try {
    const filed = listedAt(root, MODULE, NUTRITION_POINTS)[0]?.path
    const at = filed === undefined ? null : besideAt(filed, CODE, TS)
    if (at === null) {
      throw new Error(`no \`${MODULE}\` page is filed under \`${NUTRITION_POINTS}\``)
    }
    const nutrition: NutritionPoints = await import(join(root, at))
    await nutrition.rollupNutritionForDay(dayStr)
    kept.done.push(`rolled the nutrition of ${dayStr} up again`)
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
        slug,
        cover,
        plantGrams: read.plantGrams ?? null,
        estimatedCalories: read.estimatedCalories ?? null,
        notLanded,
      })
    )
    return told(report)
  }
  report.push(
    `id\t${foodId}`,
    `title\t${read.title}`,
    `slug\t${slug}`,
    `happenedAt\t${happenedAt}`,
    `day\t${dayStr}`,
    `cover\t${cover ?? "-"}`,
    `plantGrams\t${read.plantGrams ?? "-"}`,
    `estimatedCalories\t${read.estimatedCalories ?? "-"}`,
    `notLanded\t${notLanded.length === 0 ? NOTHING_MISSED : notLanded.join(",")}`
  )
  return told(report)
}

export async function foodLogged(
  read: Logged,
  given: Given,
  logging: Logging = logged
): Promise<Answer> {
  const report: string[] = []
  const said = await answering(async (done) => await logging(read, given, { done, report }))
  if (said.refusals.length === 0 || report.length === 0) return said
  return { ...said, report: [...said.report, ...report] }
}

export async function alanFood(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused)
  return await foodLogged(read, given)
}
