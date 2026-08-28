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

export type Given = Readonly<Record<string, string | readonly string[]>>

export type QueryRow = {
  readonly at?: string
  readonly values: Readonly<Record<string, unknown>>
}

export type QueryAnswer = {
  readonly n: number
  readonly value: number | null
  readonly over: number | null
  readonly rows: readonly QueryRow[]
  readonly faults: readonly string[]
  readonly omitted: readonly string[]
  readonly unfound: readonly string[]
}

export type Ask = (querySlug: string, given: Given) => Promise<QueryAnswer>

let asking: Ask | null = null

export function askThrough(ask: Ask): void {
  asking = ask
}

export function askOr(ask?: Ask): Ask {
  const held = ask ?? asking
  if (held === null) {
    throw new Error(
      "askOr: nothing was handed in to ask with, and nothing was set with `askThrough`"
    )
  }
  return held
}

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
  readonly queryKey: string | null
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

export async function resolveReadout(slug: string): Promise<ResolvedReadout> {
  const catalog = readoutCatalog()
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
  const querySlug = readout.querySlug ?? null
  const query = querySlug === null ? null : (catalog.queries.get(querySlug) ?? null)
  if (querySlug !== null && query === null) {
    throw new Error(
      `resolveReadout: readout \`${slug}\` names query \`${querySlug}\`, and no ` +
        `\`${PAGE_QUERY_PAGE_TYPE_SLUG}\` page answers to it`
    )
  }
  return {
    slug,
    label: readout.label ?? readout.title ?? slug,
    unit: readout.unit ?? "",
    place: readout.place ?? 0,
    scale,
    querySlug,
    queryKey: readout.queryKey ?? null,
    keyArgument: readout.queryArgument ?? null,
    earnedKey: readout.earnedKey ?? null,
    wireKey: readout.wireKey ?? slug,
    query,
  }
}

export async function resolveReadoutGroup(groupSlug: string): Promise<ResolvedReadoutGroup> {
  const catalog = readoutCatalog()
  const sortOrder = catalog.groups.get(groupSlug)
  if (sortOrder === undefined) {
    throw new Error(
      `resolveReadoutGroup: no group \`${groupSlug}\` — expected a ` +
        `\`${READOUT_GROUP_PAGE_TYPE_SLUG}\` page answering to it`
    )
  }
  const named: string[] = []
  const drawn: string[] = []
  for (const [slug, row] of catalog.readouts) {
    if (!(row.groupSlugs ?? []).includes(groupSlug)) continue
    named.push(slug)
    if (row.enabled) drawn.push(slug)
  }
  if (named.length === 0) {
    throw new Error(
      `resolveReadoutGroup: no readout names \`${groupSlug}\` under \`group-slugs\`, so the ` +
        "group would draw as an empty strip"
    )
  }
  if (drawn.length === 0) {
    return { slug: groupSlug, sortOrder, readouts: [], unresolved: new Map() }
  }
  const settled = await Promise.all(
    drawn.map(async (slug) => {
      try {
        return { slug, readout: await resolveReadout(slug), why: "" }
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

export async function resolveReadoutGroupLegend(groupSlug: string): Promise<string> {
  return readoutGroupLegend(await resolveReadoutGroup(groupSlug))
}

export interface ReadoutGroupReadings {
  readonly readings: ReadonlyMap<string, number | null>
  readonly unread: ReadonlyMap<string, string>
}

export async function readReadoutGroupReadings(
  readouts: readonly ResolvedReadout[],
  day: string,
  ask?: Ask
): Promise<ReadoutGroupReadings> {
  const settled = await Promise.all(
    readouts.map(async (readout) => {
      try {
        return {
          readout,
          reading: (await readReadoutReading(readout, day, ask)).reading,
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
  return readout.keyArgument === null ? readout.queryKey : null
}

export function dayGiven(readout: ResolvedReadout, query: ReadoutQuery, day: string): Given {
  const given: Record<string, string> = {}
  const unheld: string[] = []
  for (const [name, type] of Object.entries(query.takes)) {
    if (type === DAY_ARGUMENT_TYPE) given[name] = day
    else if (name === readout.keyArgument && readout.queryKey !== null) {
      given[name] = readout.queryKey
    } else unheld.push(`\`${name}\` as \`${type}\``)
  }
  if (unheld.length > 0) {
    throw new Error(
      `dayGiven: readout \`${readout.slug}\` reads query \`${query.slug}\`, which takes ` +
        `${unheld.join(", ")}, and a readout holds a day and its own \`query-key\` — ` +
        `${readoutQueryDoc(query.slug)} states what the query takes, and \`key-argument\` ` +
        "`query-argument` on the readout states which of them the query-key fills"
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
          ? `readingIn: readout \`${readout.slug}\` names no \`query-key\`, and query ` +
              `\`${query.slug}\` states no \`function:\`, so it answers keyed rows rather than one ` +
              "number — the readout has to name which number it takes"
          : `readingIn: readout \`${readout.slug}\` spends its key on argument ` +
              `\`${readout.keyArgument}\`, and query \`${query.slug}\` states no \`function:\`, so ` +
              "it answers keyed rows rather than one number and no key is left to name which"
      )
    }
    return answer.value
  }
  const key = named
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
      `readingIn: readout \`${readout.slug}\` names \`query-key: ${named}\`, which reads ` +
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
  const key = named
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
  ask: Ask | null = asking
): Promise<ReadoutReading> {
  const query = readout.query
  if (readout.querySlug === null || query === null) return UNASKED
  if (ask === null) {
    throw new Error(
      `readReadoutReading: \`${readout.slug}\` names query \`${readout.querySlug}\` and nothing ` +
        "was given to ask it with — hand one in, or set one with `askThrough`"
    )
  }
  const answer = await ask(readout.querySlug, dayGiven(readout, query, day))
  return {
    reading: readingIn(readout, query, answer),
    earned: earnedIn(readout, query, answer),
  }
}

export async function readReadoutValue(
  readout: ResolvedReadout,
  day: string,
  ask?: Ask
): Promise<number | null> {
  return (await readReadoutReading(readout, day, ask)).reading
}
