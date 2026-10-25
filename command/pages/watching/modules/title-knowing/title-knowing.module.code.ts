import { movie } from "akasha/alan/collection/watching/movie/movie.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import {
  type Calls,
  fetched,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"

type Source = "netflix" | "prime-video"

export type Linked = {
  readonly source: Source
  readonly externalId: string
  readonly externalLink: string
}

export type Kind = typeof show.slug | typeof movie.slug

export type Known = {
  readonly kind: Kind
  readonly title: string
  readonly publishedAt: string | null
  readonly minutes: number | null
  readonly tmdbId: string | null
}

const SLUG_CEILING = 100

const WIKIDATA_AT = "https://query.wikidata.org/sparql"

const WIKIDATA_ID: Readonly<Record<Source, string>> = { netflix: "P1874", "prime-video": "P8055" }

const FILM = "Q11424"

const SERIES = "Q5398426"

const TMDB_TV = "P4983"

const NETFLIX_HOST = /(?:^|\.)netflix\.com$/

const PRIME_HOST = /(?:^|\.)primevideo\.com$/

const NETFLIX_TITLE = /\/title\/(\d+)/

const NETFLIX_ID = /^\d+$/

const PRIME_DETAIL = /\/detail\/(?:.*\/)?([0-9A-Z]{10,})(?:\/|$)/

const PRIME_TITLE = /<title>\s*Prime Video:\s*([^<]+?)\s*<\/title>/

const PRIME_SEASON = /\s+-\s+Season\s+\d+$/

const ENTITIES: Readonly<Record<string, string>> = {
  "&amp;": "&",
  "&#39;": "'",
  "&quot;": '"',
  "&lt;": "<",
  "&gt;": ">",
}

export function linkedBy(said: string): Linked | string {
  let url: URL
  try {
    url = new URL(said)
  } catch {
    return `\`${said}\` is no link`
  }
  if (NETFLIX_HOST.test(url.hostname)) {
    const id = url.searchParams.get("jbv") ?? NETFLIX_TITLE.exec(url.pathname)?.[1] ?? ""
    if (!NETFLIX_ID.test(id)) return `\`${said}\` is a Netflix link naming no title`
    return {
      source: "netflix",
      externalId: id,
      externalLink: `https://www.netflix.com/title/${id}`,
    }
  }
  if (PRIME_HOST.test(url.hostname)) {
    const id = PRIME_DETAIL.exec(url.pathname)?.[1]
    if (id === undefined) return `\`${said}\` is a Prime Video link naming no title`
    return {
      source: "prime-video",
      externalId: id,
      externalLink: `https://www.primevideo.com/detail/${id}`,
    }
  }
  return `\`${said}\` is a link to neither Netflix nor Prime Video`
}

export function slugOf(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, SLUG_CEILING)
    .replace(/^-+|-+$/g, "")
}

function askedOfWikidata(linked: Linked): string {
  const id = WIKIDATA_ID[linked.source]
  return [
    "SELECT ?label ?film ?series ?published ?started ?minutes ?tmdb WHERE {",
    `  ?item wdt:${id} "${linked.externalId}" .`,
    '  ?item rdfs:label ?label FILTER(lang(?label) = "en")',
    `  BIND(EXISTS { ?item wdt:P31/wdt:P279* wd:${FILM} } AS ?film)`,
    `  BIND(EXISTS { ?item wdt:P31/wdt:P279* wd:${SERIES} } AS ?series)`,
    "  OPTIONAL { ?item wdt:P577 ?published }",
    "  OPTIONAL { ?item wdt:P580 ?started }",
    "  OPTIONAL { ?item p:P2047/psv:P2047 [ wikibase:quantityAmount ?minutes ] }",
    `  OPTIONAL { ?item wdt:${TMDB_TV} ?tmdb }`,
    "} LIMIT 1",
  ].join("\n")
}

function valueAt(binding: unknown, key: string): string | null {
  if (binding === null || typeof binding !== "object") return null
  const held = (binding as Readonly<Record<string, unknown>>)[key]
  if (held === null || typeof held !== "object") return null
  const value = (held as { readonly value?: unknown }).value
  return typeof value === "string" ? value : null
}

export function knownFromWikidata(said: unknown): Known | null {
  if (said === null || typeof said !== "object") return null
  const results = (said as { readonly results?: { readonly bindings?: unknown } }).results
  const bindings = results?.bindings
  const binding: unknown = Array.isArray(bindings) ? bindings[0] : undefined
  const title = valueAt(binding, "label")
  if (title === null) return null
  const kind =
    valueAt(binding, "film") === "true"
      ? movie.slug
      : valueAt(binding, "series") === "true"
        ? show.slug
        : null
  if (kind === null) return null
  const dated = valueAt(binding, "started") ?? valueAt(binding, "published")
  const runs = Number(valueAt(binding, "minutes"))
  const runtime = kind === movie.slug && Number.isFinite(runs) && runs > 0 ? Math.round(runs) : null
  return {
    kind,
    title,
    publishedAt: dated === null ? null : dated.slice(0, 10),
    minutes: runtime,
    tmdbId: kind === show.slug ? valueAt(binding, "tmdb") : null,
  }
}

function unescaped(said: string): string {
  return said.replace(/&(?:amp|#39|quot|lt|gt);/g, (one) => ENTITIES[one] ?? one)
}

export function knownFromPrime(html: string): Known | null {
  const said = PRIME_TITLE.exec(html)?.[1]
  if (said === undefined) return null
  const whole = unescaped(said)
  const title = whole.replace(PRIME_SEASON, "")
  const kind = title === whole ? movie.slug : show.slug
  return { kind, title, publishedAt: null, minutes: null, tmdbId: null }
}

export async function knownBy(linked: Linked, calls: Calls): Promise<Known | null> {
  const asked = `${WIKIDATA_AT}?query=${encodeURIComponent(askedOfWikidata(linked))}`
  const wikidata = await fetched(calls, asked, { accept: "application/sparql-results+json" })
  if (wikidata !== null) {
    const known = knownFromWikidata(await wikidata.json())
    if (known !== null) return known
  }
  if (linked.source !== "prime-video") return null
  const prime = await fetched(calls, linked.externalLink, { accept: "text/html" })
  return prime === null ? null : knownFromPrime(await prime.text())
}
