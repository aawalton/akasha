import { kebabizeKey } from "../../code/packages/shared/pages/access/src/file-rows.ts"
import { askTaking, type Fetcher, type Given, type QueryAnswer } from "../../code/packages/shared/pages/query/src/index.ts"
import type { StatusBarAccessClient } from "../../code/packages/shared/status-bar-access/src/client.ts"
import {
  PAGE_QUERY_PAGE_TYPE_SLUG,
  READOUT_GROUP_PAGE_TYPE_SLUG,
  type ReadoutQuery,
  type ReadoutSortOrder,
  readoutCatalog,
} from "./readout-catalog.ts"
import {
  READOUT_SCALE_PAGE_TYPE_SLUG,
  type ReadoutScale,
  readoutScaleDoc,
  readoutShape,
} from "./readout-scale-shape.ts"

export { readoutCircle } from "./readout-scale-shape.ts"

const DAY_ARGUMENT_TYPE = "calendar-date"

export function readoutQueryDoc(slug: string): string {
  return `the \`${PAGE_QUERY_PAGE_TYPE_SLUG}\` page \`${slug}\``
}

export interface ResolvedReadout {
  readonly slug: string
  readonly label: string
  readonly unit: string
  readonly place: number
  readonly scale: ReadoutScale
  readonly querySlug: string | null
  readonly sourceKey: string | null
  readonly earnedKey: string | null
  readonly wireKey: string
  readonly keyArgument: string | null
  readonly query: ReadoutQuery | null
}

export interface ResolvedReadoutGroup {
  readonly slug: string
  readonly sortOrder: ReadoutSortOrder
  readonly readouts: readonly ResolvedReadout[]
  readonly unresolved: ReadonlyMap<string, string>
}

export async function resolveReadout(
  sb: StatusBarAccessClient,
  slug: string
): Promise<ResolvedReadout> {
  const catalog = await readoutCatalog(sb)
  const readout = catalog.readouts.get(slug)
  if (readout === undefined) {
    const unreadable = catalog.unreadableReadouts.get(slug)
    if (unreadable !== undefined) {
      throw new Error(
        `resolveReadout: readout \`${slug}\` does not read as a readout, so it draws nothing ` +
          `while every other readout still draws: ${unreadable}`
      )
    }
    const searched = catalog.readoutTypeSlugs.map((typeSlug) => `\`${typeSlug}\``).join(", ")
    throw new Error(
      `resolveReadout: no readout \`${slug}\` — no page of type ${searched} answers to it, and ` +
        "each of those page types states under `files:` where its documents sit"
    )
  }
  const scaleSlug = readout.scaleSlug ?? null
  if (scaleSlug === null) {
    throw new Error(`resolveReadout: readout \`${slug}\` names no \`scale-slug\``)
  }
  const scale = catalog.scales.get(scaleSlug)
  if (scale === undefined) {
    const why = catalog.unreadableScales.get(scaleSlug)
    throw new Error(
      why === undefined
        ? `resolveReadout: readout \`${slug}\` names scale \`${scaleSlug}\`, and no ` +
            `\`${READOUT_SCALE_PAGE_TYPE_SLUG}\` page answers to it`
        : `resolveReadout: readout \`${slug}\` names scale \`${scaleSlug}\`, and ` +
            `${readoutScaleDoc(scaleSlug)} does not read as a scale: ${why}`
    )
  }
  readoutShape(scale)
  const sourceSlug = readout.sourceSlug ?? null
  const asking = sourceSlug === null ? undefined : catalog.sources.get(sourceSlug)
  const querySlug = asking?.querySlug ?? null
  const query = querySlug === null ? null : (catalog.queries.get(querySlug) ?? null)
  if (querySlug !== null && query === null) {
    throw new Error(
      `resolveReadout: readout \`${slug}\` takes its reading from source \`${sourceSlug}\`, which ` +
        `names query \`${querySlug}\`, and no \`${PAGE_QUERY_PAGE_TYPE_SLUG}\` page answers to it`
    )
  }
  return {
    slug,
    label: readout.label ?? readout.title ?? slug,
    unit: readout.unit ?? "",
    place: readout.place ?? 0,
    scale,
    querySlug,
    sourceKey: readout.sourceKey ?? null,
    keyArgument: asking?.keyArgument ?? null,
    earnedKey: readout.earnedKey ?? null,
    wireKey: readout.wireKey ?? slug,
    query,
  }
}

export async function resolveReadoutGroup(
  sb: StatusBarAccessClient,
  groupSlug: string
): Promise<ResolvedReadoutGroup> {
  const catalog = await readoutCatalog(sb)
  const sortOrder = catalog.groups.get(groupSlug)
  if (sortOrder === undefined) {
    throw new Error(
      `resolveReadoutGroup: no group \`${groupSlug}\` — expected a ` +
        `\`${READOUT_GROUP_PAGE_TYPE_SLUG}\` page answering to it`
    )
  }
  const named: string[] = []
  for (const [slug, row] of catalog.readouts) {
    if ((row.groupSlugs ?? []).includes(groupSlug)) named.push(slug)
  }
  if (named.length === 0) {
    throw new Error(
      `resolveReadoutGroup: no readout names \`${groupSlug}\` under \`group-slugs\`, so the ` +
        "group would draw as an empty strip"
    )
  }
  const settled = await Promise.all(
    named.map(async (slug) => {
      try {
        return { slug, readout: await resolveReadout(sb, slug), why: "" }
      } catch (error) {
        return { slug, readout: null, why: error instanceof Error ? error.message : String(error) }
      }
    })
  )
  const resolved: ResolvedReadout[] = []
  const unresolved = new Map<string, string>()
  for (const one of settled) {
    if (one.readout === null) unresolved.set(one.slug, one.why)
    else resolved.push(one.readout)
  }
  if (resolved.length === 0) {
    const refused = [...unresolved].map(([slug, why]) => `\`${slug}\`: ${why}`).join("; ")
    throw new Error(
      `resolveReadoutGroup: every readout naming \`${groupSlug}\` refused to resolve, so the ` +
        `group would draw as an empty strip — ${refused}`
    )
  }
  return { slug: groupSlug, sortOrder, readouts: drawnOrder(resolved, sortOrder), unresolved }
}

const LEGEND_SEPARATOR = " · "

export function readoutGroupLegend(group: ResolvedReadoutGroup): string {
  return group.readouts.map((readout) => readout.label).join(LEGEND_SEPARATOR)
}

export async function resolveReadoutGroupLegend(
  sb: StatusBarAccessClient,
  groupSlug: string
): Promise<string> {
  return readoutGroupLegend(await resolveReadoutGroup(sb, groupSlug))
}

export interface ReadoutGroupReadings {
  readonly readings: ReadonlyMap<string, number | null>
  readonly unread: ReadonlyMap<string, string>
}

export async function readReadoutGroupReadings(
  readouts: readonly ResolvedReadout[],
  day: string,
  fetcher?: Fetcher
): Promise<ReadoutGroupReadings> {
  const settled = await Promise.all(
    readouts.map(async (readout) => {
      try {
        return {
          readout,
          reading: (await readReadoutReading(readout, day, fetcher)).reading,
          why: "",
        }
      } catch (error) {
        return {
          readout,
          reading: null,
          why: error instanceof Error ? error.message : String(error),
        }
      }
    })
  )
  const readings = new Map<string, number | null>()
  const unread = new Map<string, string>()
  for (const one of settled) {
    if (one.why === "") readings.set(one.readout.slug, one.reading)
    else unread.set(one.readout.slug, one.why)
  }
  if (readings.size === 0 && unread.size > 0) {
    const refused = [...unread].map(([slug, why]) => `\`${slug}\`: ${why}`).join("; ")
    throw new Error(
      `readReadoutGroupReadings: every readout of ${unread.size} went unread on ${day}, so the ` +
        `group has no reading to draw — ${refused}`
    )
  }
  return { readings, unread }
}

export function drawnOrder(
  resolved: readonly ResolvedReadout[],
  sortOrder: ReadoutSortOrder
): readonly ResolvedReadout[] {
  return [...resolved].sort((a, b) => {
    if (sortOrder === "place" && a.place !== b.place) return a.place - b.place
    return a.label.localeCompare(b.label)
  })
}

function answerKeyOf(readout: ResolvedReadout): string | null {
  return readout.keyArgument === null ? readout.sourceKey : null
}

export function dayGiven(readout: ResolvedReadout, query: ReadoutQuery, day: string): Given {
  const given: Record<string, string> = {}
  const unheld: string[] = []
  for (const [name, type] of Object.entries(query.takes)) {
    if (type === DAY_ARGUMENT_TYPE) given[name] = day
    else if (name === readout.keyArgument && readout.sourceKey !== null) {
      given[name] = readout.sourceKey
    } else unheld.push(`\`${name}\` as \`${type}\``)
  }
  if (unheld.length > 0) {
    throw new Error(
      `dayGiven: readout \`${readout.slug}\` reads query \`${query.slug}\`, which takes ` +
        `${unheld.join(", ")}, and a readout holds a day and its own \`source-key\` — ` +
        `${readoutQueryDoc(query.slug)} states what the query takes, and \`key-argument\` ` +
        "on the readout's source states which of them the source-key fills"
    )
  }
  return given
}

const ANSWER_OWN_NUMBERS = ["n", "value", "over"] as const

type AnswerOwnNumber = (typeof ANSWER_OWN_NUMBERS)[number]

const ANSWER_OWN_NUMBER_KEYS: ReadonlySet<string> = new Set(ANSWER_OWN_NUMBERS)

function isAnswerOwnNumber(key: string): key is AnswerOwnNumber {
  return ANSWER_OWN_NUMBER_KEYS.has(key)
}

function numberFrom(held: unknown, what: string): number | null {
  if (held === null || held === undefined || held === "") return null
  const read = typeof held === "number" ? held : Number(held)
  if (!Number.isFinite(read)) {
    throw new Error(`numberFrom: ${what} answered \`${String(held)}\`, which is no number`)
  }
  return read
}

export function readingIn(
  readout: ResolvedReadout,
  query: ReadoutQuery,
  answer: QueryAnswer
): number | null {
  const named = answerKeyOf(readout)
  if (named === null) {
    if (!query.reducesToOneNumber) {
      throw new Error(
        readout.keyArgument === null
          ? `readingIn: readout \`${readout.slug}\` names no \`source-key\`, and query ` +
              `\`${query.slug}\` states no \`function:\`, so it answers keyed rows rather than one ` +
              "number — the readout has to name which number it takes"
          : `readingIn: readout \`${readout.slug}\` spends its key on argument ` +
              `\`${readout.keyArgument}\`, and query \`${query.slug}\` states no \`function:\`, so ` +
              "it answers keyed rows rather than one number and no key is left to name which"
      )
    }
    return answer.value
  }
  const key = kebabizeKey(named)
  if (isAnswerOwnNumber(key)) {
    if (key !== "n" && !query.reducesToOneNumber) {
      throw new Error(
        `readingIn: readout \`${readout.slug}\` takes \`${key}\`, and query ` +
          `\`${query.slug}\` states no \`function:\`, so it never answers one`
      )
    }
    return answer[key]
  }
  if (answer.rows.length === 0) return null
  if (answer.rows.length > 1) {
    throw new Error(
      `readingIn: readout \`${readout.slug}\` takes \`${key}\` and query \`${query.slug}\` ` +
        `answered ${answer.rows.length} rows, and nothing states which of them this readout is`
    )
  }
  const values = answer.rows[0]?.values ?? {}
  if (!Object.hasOwn(values, key)) {
    const carried = Object.keys(values)
      .map((one) => `\`${one}\``)
      .join(", ")
    throw new Error(
      `readingIn: readout \`${readout.slug}\` names \`source-key: ${named}\`, which reads ` +
        `\`${key}\`, and query \`${query.slug}\` answers ` +
        `${carried === "" ? "no keys at all" : carried}`
    )
  }
  return numberFrom(values[key], `\`${key}\` on query \`${query.slug}\``)
}

export function earnedIn(
  readout: ResolvedReadout,
  query: ReadoutQuery,
  answer: QueryAnswer
): boolean {
  const named = readout.earnedKey
  if (named === null) return false
  const key = kebabizeKey(named)
  if (answer.rows.length === 0) return false
  if (answer.rows.length > 1) {
    throw new Error(
      `earnedIn: readout \`${readout.slug}\` names \`earned-key: ${named}\` and query ` +
        `\`${query.slug}\` answered ${answer.rows.length} rows, and nothing states which of them ` +
        "this readout is"
    )
  }
  const values = answer.rows[0]?.values ?? {}
  if (!Object.hasOwn(values, key)) {
    const carried = Object.keys(values)
      .map((one) => `\`${one}\``)
      .join(", ")
    throw new Error(
      `earnedIn: readout \`${readout.slug}\` names \`earned-key: ${named}\`, which reads ` +
        `\`${key}\`, and query \`${query.slug}\` answers ` +
        `${carried === "" ? "no keys at all" : carried}`
    )
  }
  const held = values[key]
  return held === true || held === "true"
}

export interface ReadoutReading {
  readonly reading: number | null
  readonly earned: boolean
}

const UNASKED: ReadoutReading = { reading: null, earned: false }

export async function readReadoutReading(
  readout: ResolvedReadout,
  day: string,
  fetcher?: Fetcher
): Promise<ReadoutReading> {
  const query = readout.query
  if (readout.querySlug === null || query === null) return UNASKED
  const asked = await askTaking(readout.querySlug, dayGiven(readout, query, day), fetcher)
  if (!asked.ok) {
    throw new Error(`readReadoutReading: \`${readout.slug}\` went unread: ${asked.why}`)
  }
  return {
    reading: readingIn(readout, query, asked.answer),
    earned: earnedIn(readout, query, asked.answer),
  }
}

export async function readReadoutValue(
  readout: ResolvedReadout,
  day: string,
  fetcher?: Fetcher
): Promise<number | null> {
  return (await readReadoutReading(readout, day, fetcher)).reading
}
