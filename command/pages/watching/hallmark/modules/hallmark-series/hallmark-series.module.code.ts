import type { Listed } from "akasha/command/pages/watching/hallmark/modules/hallmark-listing/hallmark-listing.module.code.ts"
import {
  type Matched,
  type Refused,
  squashed,
  type Titled,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-matching/hallmark-matching.module.code.ts"

export type Category = "romance" | "mystery" | "christmas"

type Plain = Exclude<Category, "christmas">

export type Entry = {
  readonly kind: "movie" | "show"
  readonly title: string
  readonly listed: Listed | null
  readonly titled: Titled | null
  readonly refused: Refused | null
  readonly christmas: boolean
  readonly base: Plain
  series: string | null
}

export type Gathering = { readonly id: number; readonly name: string }

export type Series = {
  readonly title: string
  readonly entries: Entry[]
  gathering: Gathering | null
}

export const CATEGORIES: readonly Category[] = ["romance", "mystery", "christmas"]

const CHRISTMAS_BLOCKS: ReadonlySet<string> = new Set(["CtC", "MoC", "TMWMoC", "CiJ"])

const CHRISTMAS_WORDS =
  /\b(christmas|xmas|santas?|mistletoe|noel|yule|yuletide|nutcracker|reindeer|jingle|sleigh|north ?pole|tinsel|nativity|gingerbread|snowman|merry)\b/i

const MYSTERY_NETWORK = /mysteries|mystery|movie channel/i

const MYSTERY_GENRES: ReadonlySet<string> = new Set(["Mystery", "Crime"])

const UNSCRIPTED: ReadonlySet<string> = new Set(["Talk", "Reality", "News", "Documentary", "Kids"])

const MINISERIES = 4

export const SERIES_ARTICLE = /\((film series|franchise|TV series)\)|^List of .* episodes$/i

const SEQUEL = /\s+(2|3|4|5|II|III|IV|Part\s+\w+)$/i

const PREFIX = /^(.+?):\s/

const SHOWN = 10

export function coreOf(said: string): string {
  return said
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/^list of /, "")
    .replace(/ episodes$/, "")
    .replace(/\s+(collection|film series|series|trilogy|saga)$/, "")
    .replace(/^the /, "")
    .replace(/mysteries/g, "mystery")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function seriesNamed(said: string): string {
  return said
    .replace(/\s*\((film series|franchise|TV series|film|miniseries)\)\s*$/i, "")
    .replace(/^List of /, "")
    .replace(/ episodes$/, "")
    .replace(/\s+(Collection|Film Series|Trilogy|Saga)$/i, "")
    .trim()
}

export function christmasOf(listed: Listed | null, title: string): boolean {
  if (CHRISTMAS_WORDS.test(title)) return true
  if (listed === null) return false
  return listed.inJuly || listed.blocks.some((one) => CHRISTMAS_BLOCKS.has(one))
}

export function baseOf(listed: Listed | null, titled: Titled | null): Plain {
  const network = listed !== null && MYSTERY_NETWORK.test(listed.network)
  const genre = (titled?.genres ?? []).some((one) => MYSTERY_GENRES.has(one))
  return network || genre ? "mystery" : "romance"
}

export function articleOf(listed: Listed | null): string | null {
  return listed?.article?.replace(/#.*/, "") ?? null
}

export function yearOf(said: unknown): number | null {
  const year = typeof said === "string" ? Number(said.slice(0, 4)) : Number.NaN
  return Number.isFinite(year) && year > 0 ? year : null
}

function prefixOf(title: string): string | null {
  return PREFIX.exec(title)?.[1] ?? null
}

export function grouped<Key>(
  entries: readonly Entry[],
  keyOf: (one: Entry) => Key | null
): Map<Key, Entry[]> {
  const groups = new Map<Key, Entry[]>()
  for (const one of entries) {
    const key = keyOf(one)
    if (key !== null) groups.set(key, [...(groups.get(key) ?? []), one])
  }
  return groups
}

type Joining = (title: string, entry: Entry, gathering?: Gathering | null) => undefined

function joiningInto(series: Map<string, Series>): Joining {
  return (title, entry, gathering = null) => {
    const key = coreOf(title)
    const held = series.get(key) ?? { title, entries: [], gathering }
    if (!held.entries.includes(entry)) held.entries.push(entry)
    if (held.gathering === null && gathering !== null) held.gathering = gathering
    series.set(key, held)
    entry.series = key
  }
}

function byCollection(entries: readonly Entry[], join: Joining): undefined {
  for (const group of grouped(entries, (one) => one.titled?.gathering?.id ?? null).values()) {
    const gathering = group[0]?.titled?.gathering ?? null
    if (gathering === null || group.length < 2) continue
    const named = coreOf(gathering.name)
    const naming = group.filter((one) => coreOf(one.title).includes(named)).length
    if (naming * 2 < group.length) continue
    for (const one of group) join(seriesNamed(gathering.name), one, gathering)
  }
}

function byArticle(
  entries: readonly Entry[],
  series: Map<string, Series>,
  join: Joining
): undefined {
  for (const [article, group] of grouped(entries, (one) => articleOf(one.listed))) {
    const left = group.filter((one) => one.series === null)
    if (left.length === 0) continue
    const named = seriesNamed(article)
    const core = coreOf(named)
    const already = group.find((one) => one.series !== null)?.series ?? null
    if (already !== null) {
      for (const one of left) join(series.get(already)?.title ?? named, one)
      continue
    }
    const titledAs = group.some((one) => coreOf(one.title) === core)
    const shared =
      group.length >= 2 && titledAs && group.every((one) => coreOf(one.title).startsWith(core))
    const listing = SERIES_ARTICLE.test(article) && (group.length >= 2 || series.has(core))
    if (listing || shared) for (const one of left) join(named, one)
  }
}

function byPrefix(
  entries: readonly Entry[],
  series: Map<string, Series>,
  join: Joining
): undefined {
  const prefixed = grouped(entries, (one) => {
    const prefix = prefixOf(one.title)
    return prefix === null ? null : coreOf(prefix)
  })
  for (const one of entries) prefixed.get(coreOf(one.title))?.push(one)
  for (const [key, group] of prefixed) {
    if (group.length < 2) continue
    const already = series.has(key)
      ? key
      : (group.find((one) => one.series !== null)?.series ?? null)
    const first = group.find((one) => prefixOf(one.title) !== null)
    const named = (first === undefined ? null : prefixOf(first.title)) ?? key
    const title = already === null ? named : (series.get(already)?.title ?? named)
    for (const one of group) if (one.series === null) join(title, one)
  }
}

function bySequel(
  entries: readonly Entry[],
  series: Map<string, Series>,
  join: Joining
): undefined {
  for (const one of entries) {
    if (one.series !== null || !SEQUEL.test(one.title)) continue
    const first = one.title.replace(SEQUEL, "").replace(/:$/, "")
    const original = entries.find(
      (other) => other !== one && squashed(other.title) === squashed(first)
    )
    if (original === undefined) continue
    const title = series.get(original.series ?? coreOf(first))?.title ?? first
    join(title, original)
    join(title, one)
  }
}

export function seriesFor(entries: readonly Entry[]): Map<string, Series> {
  const series = new Map<string, Series>()
  const join = joiningInto(series)
  const films = entries.filter((one) => one.kind === "movie")
  byCollection(films, join)
  byArticle(films, series, join)
  byPrefix(films, series, join)
  bySequel(films, series, join)
  for (const one of entries) {
    const key = coreOf(one.title)
    const held = series.get(key)
    if (one.kind !== "show" || one.series !== null || held === undefined) continue
    one.series = key
    held.entries.push(one)
  }
  return series
}

export function seriesCategory(held: Series): Category {
  const plain = held.entries.filter((one) => !one.christmas)
  const mystery = plain.filter((one) => one.base === "mystery").length
  if (plain.length > 0 && mystery * 2 >= plain.length) return "mystery"
  const christmas = held.entries.length - plain.length
  return christmas * 2 >= held.entries.length ? "christmas" : "romance"
}

function scripted(titled: Titled): boolean {
  return titled.genres.length > 0 && !titled.genres.some((one) => UNSCRIPTED.has(one))
}

export function entriesOf(listed: readonly Matched[], shows: readonly Titled[]): Entry[] {
  const entries: Entry[] = []
  const tv = new Set<number>()
  for (const one of listed) {
    const titled = one.titled
    if (titled?.kind === "tv") {
      if (tv.has(titled.id)) continue
      tv.add(titled.id)
    }
    const onTv = titled?.kind === "tv"
    entries.push({
      kind: onTv ? "show" : "movie",
      title: one.listed.title,
      listed: one.listed,
      titled,
      refused: one.refused,
      christmas: christmasOf(one.listed, one.listed.title),
      base: baseOf(one.listed, titled),
      series: null,
    })
  }
  const filmed = new Map(listed.map((one) => [squashed(one.listed.title), one.listed]))
  for (const titled of shows) {
    if (tv.has(titled.id) || !scripted(titled)) continue
    const film = filmed.get(squashed(titled.title))
    const aired = yearOf(titled.publishedAt)
    const brief = (titled.episodes ?? 1) <= MINISERIES
    if (film !== undefined && brief && aired !== null && Math.abs(aired - film.year) <= 1) continue
    tv.add(titled.id)
    entries.push({
      kind: "show",
      title: titled.title,
      listed: null,
      titled,
      refused: null,
      christmas: christmasOf(null, titled.title),
      base: baseOf(null, titled),
      series: null,
    })
  }
  return entries
}

function counted(entries: readonly Entry[], categoryOf: ReadonlyMap<string, Category>): string {
  const counts: Record<Category, number> = { romance: 0, mystery: 0, christmas: 0 }
  for (const one of entries) {
    const own = one.christmas ? "christmas" : one.base
    const category = one.series === null ? own : (categoryOf.get(one.series) ?? own)
    counts[category] += 1
    if (one.series !== null && one.christmas && category !== "christmas") counts.christmas += 1
  }
  return CATEGORIES.map((one) => `${one} ${String(counts[one])}`).join("  ")
}

function servicesSaid(entries: readonly Entry[]): string {
  const streamed = entries.filter((one) => (one.titled?.services.length ?? 0) > 0).length
  const services = new Map<string, number>()
  for (const one of entries) {
    for (const said of one.titled?.services ?? []) services.set(said, (services.get(said) ?? 0) + 1)
  }
  const top = [...services]
    .sort((one, other) => other[1] - one[1])
    .slice(0, SHOWN)
    .map(([said, n]) => `${said} ${String(n)}`)
  return `streaming in the US ${String(streamed)}  most often: ${top.join(", ")}`
}

export function summaryOf(
  entries: readonly Entry[],
  categoryOf: ReadonlyMap<string, Category>
): readonly string[] {
  const movies = entries.filter((one) => one.kind === "movie").length
  const shows = entries.length - movies
  const titles = `titles ${String(entries.length)}  movies ${String(movies)}  shows ${String(shows)}`
  const loose = entries.flatMap((one) =>
    one.titled?.loose === true ? [`loose  ${one.title}  as  ${one.titled.title}`] : []
  )
  const refused = entries.flatMap((one) =>
    one.refused === null ? [] : [`refused  ${one.title}  as  ${one.refused.title}`]
  )
  const unmatched = entries.flatMap((one) =>
    one.titled === null ? [`unmatched  ${String(one.listed?.year ?? "")}  ${one.title}`] : []
  )
  const said = [titles, counted(entries, categoryOf), servicesSaid(entries)]
  return [...said, ...loose, ...refused, ...unmatched]
}
