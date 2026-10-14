import { status as statusProperty } from "akasha/alan/collection/properties/status.select-property.ts"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { movie } from "akasha/alan/collection/watching/movie/movie.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { mountainWallAt } from "akasha/alan/harness/day-boundary/modules/mountain-wall/mountain-wall.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { collectionStatus } from "akasha/command/argument/pages/collection-status.argument.ts"
import { day as dayArgument } from "akasha/command/argument/pages/day.argument.ts"
import { link } from "akasha/command/argument/pages/link.argument.ts"
import {
  DATA,
  faulted,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { watchingLog as page } from "akasha/command/pages/watching/log/watching-log.command.ts"
import type {
  Query,
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.module.code.ts"

export type Source = "netflix" | "prime-video"

export type Linked = {
  readonly source: Source
  readonly externalId: string
  readonly externalLink: string
}

type Kind = typeof show.slug | typeof movie.slug

export type Known = {
  readonly kind: Kind
  readonly title: string
  readonly publishedAt: string | null
  readonly minutes: number | null
}

type Held = {
  readonly kind: Kind
  readonly slug: string
  readonly title: string
  readonly status: string | null
  readonly identities: readonly Row[]
}

export type Calls = {
  readonly ask: (query: Query) => Promise<Rows>
  readonly write: (asked: Writing) => Promise<Wrote>
  readonly fetch: (url: string, init: RequestInit) => Promise<Response>
}

const CALLS: Calls = {
  ask: (query) => askingFor(query),
  write: (asked) => writingFor(asked),
  fetch: (url, init) => fetch(url, init),
}

const WRITER = "watching logging <watching-logging@alanwalton.com>"

const KINDS: readonly Kind[] = [show.slug, movie.slug]

const COMPLETED = "completed"

const MINUTES = `${unit.slug}/${minutes.slug}`

const WATCHING_AT = "alan/collection/watching"

const SLUG_CEILING = 100

const FETCH_CEILING_MS = 15000

const AGENT = "alanwalton.com collection (aawalton@gmail.com)"

const WIKIDATA_AT = "https://query.wikidata.org/sparql"

const WIKIDATA_ID: Readonly<Record<Source, string>> = { netflix: "P1874", "prime-video": "P8055" }

const FILM = "Q11424"

const SERIES = "Q5398426"

const NETFLIX_HOST = /(?:^|\.)netflix\.com$/

const PRIME_HOST = /(?:^|\.)primevideo\.com$/

const NETFLIX_TITLE = /\/title\/(\d+)/

const NETFLIX_ID = /^\d+$/

const PRIME_DETAIL = /\/detail\/(?:.*\/)?([0-9A-Z]{10,})(?:\/|$)/

const PRIME_TITLE = /<title>\s*Prime Video:\s*([^<]+?)\s*<\/title>/

const PRIME_SEASON = /\s+-\s+Season\s+\d+$/

const A_DAY = /^\d{4}-\d{2}-\d{2}$/

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

export function dayNow(now: Date): string {
  const wall = mountainWallAt(now)
  return `${String(wall.year)}-${padTwo(wall.month)}-${padTwo(wall.day)}`
}

export function askedOfWikidata(linked: Linked): string {
  const id = WIKIDATA_ID[linked.source]
  return [
    "SELECT ?label ?film ?series ?published ?started ?minutes WHERE {",
    `  ?item wdt:${id} "${linked.externalId}" .`,
    '  ?item rdfs:label ?label FILTER(lang(?label) = "en")',
    `  BIND(EXISTS { ?item wdt:P31/wdt:P279* wd:${FILM} } AS ?film)`,
    `  BIND(EXISTS { ?item wdt:P31/wdt:P279* wd:${SERIES} } AS ?series)`,
    "  OPTIONAL { ?item wdt:P577 ?published }",
    "  OPTIONAL { ?item wdt:P580 ?started }",
    "  OPTIONAL { ?item p:P2047/psv:P2047 [ wikibase:quantityAmount ?minutes ] }",
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
  return { kind, title, publishedAt: dated === null ? null : dated.slice(0, 10), minutes: runtime }
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
  return { kind, title, publishedAt: null, minutes: null }
}

async function fetched(calls: Calls, url: string, accept: string): Promise<Response | null> {
  try {
    const answered = await calls.fetch(url, {
      headers: { "user-agent": AGENT, accept },
      signal: AbortSignal.timeout(FETCH_CEILING_MS),
    })
    return answered.ok ? answered : null
  } catch {
    return null
  }
}

async function knownBy(linked: Linked, calls: Calls): Promise<Known | null> {
  const asked = `${WIKIDATA_AT}?query=${encodeURIComponent(askedOfWikidata(linked))}`
  const wikidata = await fetched(calls, asked, "application/sparql-results+json")
  if (wikidata !== null) {
    const known = knownFromWikidata(await wikidata.json())
    if (known !== null) return known
  }
  if (linked.source !== "prime-video") return null
  const prime = await fetched(calls, linked.externalLink, "text/html")
  return prime === null ? null : knownFromPrime(await prime.text())
}

function heldIn(kind: Kind, row: Row): Held | null {
  const slug = row.slug
  const title = row.title
  if (typeof slug !== "string" || typeof title !== "string") return null
  const status = typeof row.status === "string" ? row.status : null
  const said = row.externalIdentity
  const identities = Array.isArray(said)
    ? said.filter((one): one is Row => one !== null && typeof one === "object")
    : []
  return { kind, slug, title, status, identities }
}

function names(held: Held, linked: Linked): boolean {
  return held.identities.some(
    (one) => one.source === linked.source && one.externalId === linked.externalId
  )
}

function titled(title: string): string {
  return slugOf(title).replace(/-/g, "")
}

export function heldFor(every: readonly Held[], linked: Linked, known: Known | null): Held | null {
  const named = every.find((one) => names(one, linked))
  if (named !== undefined || known === null) return named ?? null
  const sought = titled(known.title)
  return every.find((one) => one.kind === known.kind && titled(one.title) === sought) ?? null
}

type Asked = { readonly every: readonly Held[]; readonly at: string | null }

async function everyHeld(calls: Calls): Promise<Asked | string> {
  const every: Held[] = []
  let at: string | null = null
  for (const kind of KINDS) {
    const rows = await calls.ask({
      pageTypeSlug: kind,
      keys: ["slug", "title", "status", "externalIdentity"],
    })
    if ("refused" in rows) return rows.refused
    at = rows.at ?? at
    for (const row of rows.rows) {
      const held = heldIn(kind, row)
      if (held !== null) every.push(held)
    }
  }
  return { every, at }
}

function identityOf(linked: Linked): Row {
  return {
    source: linked.source,
    externalId: linked.externalId,
    externalLink: linked.externalLink,
  }
}

export function freshValues(
  known: Known,
  linked: Linked,
  status: string,
  day: string
): Readonly<Record<string, unknown>> {
  const done = status === COMPLETED
  const length = known.minutes ?? 0
  return {
    title: known.title,
    ownLength: length,
    ownProgress: done ? length : 0,
    unit: MINUTES,
    status,
    ...(done ? { completedAt: day } : {}),
    ...(known.publishedAt === null ? {} : { publishedAt: known.publishedAt }),
    externalIdentity: [identityOf(linked)],
  }
}

export function keptValues(
  held: Held,
  linked: Linked,
  status: string,
  day: string
): Readonly<Record<string, unknown>> {
  const identity = names(held, linked)
    ? {}
    : { externalIdentity: [...held.identities, identityOf(linked)] }
  if (held.status === COMPLETED || held.status === status) return identity
  return { status, ...(status === COMPLETED ? { completedAt: day } : {}), ...identity }
}

function pathOf(kind: Kind, slug: string): string {
  return `${WATCHING_AT}/${kind}/pages/${slug}.${kind}.ts`
}

async function logged(linked: Linked, status: string, day: string, calls: Calls): Promise<Answer> {
  const asked = await everyHeld(calls)
  if (typeof asked === "string") return refusedBy([asked], OPERATIONAL)
  const first = heldFor(asked.every, linked, null)
  const known = first === null ? await knownBy(linked, calls) : null
  const held = first ?? heldFor(asked.every, linked, known)
  if (held !== null) {
    const values = keptValues(held, linked, status, day)
    const named = `${held.kind}/${held.slug}`
    if (Object.keys(values).length === 0) return told([`${named}  ${held.status ?? ""}  unchanged`])
    const wrote = await calls.write({
      writer: WRITER,
      message: `${held.title} is logged as ${status}`,
      ...(asked.at === null ? {} : { read: asked.at }),
      pages: [{ pageTypeSlug: held.kind, slug: held.slug, merge: true, values }],
    })
    if ("refused" in wrote) return refusedBy([wrote.refused], OPERATIONAL)
    const now = typeof values.status === "string" ? values.status : (held.status ?? "")
    return told([`${named}  ${now}  updated`])
  }
  if (known === null) {
    return refusedBy(
      [`no title is known for ${linked.source} ${linked.externalId}, so nothing was logged`],
      DATA
    )
  }
  const slug = slugOf(known.title)
  const wrote = await calls.write({
    writer: WRITER,
    message: `${known.title} is logged as ${status}`,
    pages: [
      {
        pageTypeSlug: known.kind,
        slug,
        path: pathOf(known.kind, slug),
        fresh: true,
        values: freshValues(known, linked, status, day),
      },
    ],
  })
  if ("refused" in wrote) return refusedBy([wrote.refused], OPERATIONAL)
  return told([`${known.kind}/${slug}  ${status}  created`])
}

export async function watchingLog(
  argv: readonly string[],
  given: Given,
  calls: Calls = CALLS
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [link, collectionStatus, dayArgument])
  if ("refused" in read) return refusedBy(read.refused)
  const linked = linkedBy(read.taken.link)
  const status = read.taken.collectionStatus
  const day = read.taken.day ?? dayNow(new Date())
  const refusals: string[] = []
  if (typeof linked === "string") refusals.push(linked)
  if (!(statusProperty.values as readonly string[]).includes(status)) {
    refusals.push(`\`${status}\` is no status, which is one of ${statusProperty.values.join(", ")}`)
  }
  if (!A_DAY.test(day)) refusals.push(`\`${day}\` is no day, which is written as YYYY-MM-DD`)
  if (refusals.length > 0 || typeof linked === "string") return refusedBy(refusals)
  try {
    return await logged(linked, status, day, calls)
  } catch (thrown) {
    return faulted(thrown)
  }
}
