import type {
  Appended,
  Appending,
} from "akasha/page/service/modules/page-appending/page-appending.module.code.ts"
import type {
  Query,
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type {
  Incremented,
  Incrementing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"
import type {
  Read,
  Asked as Sought,
} from "akasha/page/service/modules/page-reading/page-reading.module.code.ts"
import type {
  Shaped,
  ShapedEvery,
} from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"
import type {
  Kept,
  Put,
  Wrote,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { STATUS_FOR } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

export const ASK_AT = "/ask"

export const READ_AT = "/read"

export const WRITE_AT = "/write"

const SHAPE_AT = "/shape"

export const FILE_AT = "/file"

export const APPEND_AT = "/append"

const PLACE_AT = "/place"

export const INCREMENT_AT = "/increment"

const EVENTS_AT = "/events"

const FOLLOW_AT = "/follow"

export const ASKING_AGENT = "akasha-agent-id"

const AGENT_ENV = "AGENT_ID"

export const ORIGIN_ENV = "PAGES_SERVICE_ORIGIN"

const ORIGIN_NAMES: readonly string[] = [ORIGIN_ENV, "PAGE_STORE_ORIGIN"]

const OVER_THE_TAILNET = "http://page-forwarder.page-forwarder.svc.cluster.local:8787"

const IN_A_BROWSER = "/api"

const ASK_CEILING_MS = 5000

const SHAPES_CEILING_MS = 30000

const WRITE_CEILING_MS = 30000

const FILE_CEILING_MS = 15000

const APPEND_CEILING_MS = 15000

const PLACE_CEILING_MS = 30000

export const ATTEMPTS = 6

const NO_COUNT_SAYS =
  "the pages were asked to skip or to take and answered no count of what matched, so the rows that came back would be read as the whole population"

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export type Sleeper = (waited: number) => Promise<void>

export type Writing = {
  readonly writer: string
  readonly message: string
  readonly puts?: readonly Put[]
  readonly removes?: readonly string[]
  readonly kept?: readonly Kept[]
  readonly pages?: readonly Naming[]
  readonly read?: string
}

function saidIn(name: string): string | null {
  const held = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
  const said = held?.env?.[name]
  return said === undefined || said === "" ? null : said
}

export function askerHeaders(agent: string | null = saidIn(AGENT_ENV)): Record<string, string> {
  return agent === null ? {} : { [ASKING_AGENT]: agent }
}

function browserOrigin(): string | null {
  const held = (globalThis as { location?: { origin?: string } }).location
  const said = held?.origin
  return typeof said === "string" && said !== "" ? said : null
}

export function originSaid(named: readonly string[] = ORIGIN_NAMES): string | null {
  for (const one of named) {
    const said = saidIn(one)
    if (said !== null) return said.replace(/\/+$/, "")
  }
  return null
}

export function originOf(named: readonly string[] = ORIGIN_NAMES): string {
  const said = originSaid(named)
  if (said !== null) return said
  const here = browserOrigin()
  return here === null ? OVER_THE_TAILNET : `${here}${IN_A_BROWSER}`
}

export function backoffFor(taken: number): number {
  return 100 * 2 ** (taken - 1)
}

const sleep: Sleeper = (waited) =>
  new Promise((settle) => {
    setTimeout(settle, waited)
  })

export function refusedIn(said: unknown): string | null {
  if (said === null || typeof said !== "object") return null
  const held = (said as { readonly refused?: unknown }).refused
  return typeof held === "string" ? held : null
}

const fetchThrough: Fetcher = (url, init) => fetch(url, init)

type Sent = { readonly said: unknown } | { readonly refused: string }

type Taken = { readonly held: unknown } | { readonly unreadable: string }

export function bytesSaid(answered: Response): string {
  const length = answered.headers.get("content-length")
  return length === null || length === "" ? "body of a length nothing stated" : `${length} bytes`
}

async function takenFrom(answered: Response): Promise<Taken> {
  try {
    const held: unknown = await answered.json()
    return { held }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return {
      unreadable: `the pages answered ${answered.status}, and the ${bytesSaid(answered)} that came back would not read as JSON: ${why}`,
    }
  }
}

async function sentTo(
  at: string,
  body: unknown,
  ceiling: number,
  fetcher: Fetcher,
  naps: Sleeper,
  origin: string = originOf(),
  racedAgain = true
): Promise<Sent> {
  let why = "nothing came back"
  for (let taken = 1; taken <= ATTEMPTS; taken += 1) {
    try {
      const answered = await fetcher(`${origin}${at}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          ...askerHeaders(),
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(ceiling),
      })
      const got = await takenFrom(answered)
      if ("unreadable" in got) return { refused: got.unreadable }
      const refused = refusedIn(got.held)
      const raced = racedAgain && answered.status === STATUS_FOR.race
      if (refused !== null && !raced) return { refused }
      if (answered.ok) return { said: got.held }
      why = refused ?? `the pages answered ${answered.status}`
    } catch (thrown) {
      why = thrown instanceof Error ? thrown.message : String(thrown)
    }
    if (taken < ATTEMPTS) await naps(backoffFor(taken))
  }
  return { refused: `${why} — ${ATTEMPTS} attempts reached ${origin}${at}` }
}

export function objectIn(said: unknown): Readonly<Record<string, unknown>> | null {
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  return said as Readonly<Record<string, unknown>>
}

export async function askingFor(
  query: Query,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Rows> {
  const held = await sentTo(ASK_AT, query, ASK_CEILING_MS, fetcher, naps)
  if ("refused" in held) return held
  const said = objectIn(held.said)
  if (said === null) {
    return { refused: "the pages answered a question with something no rows can be read out of" }
  }
  const rows = said.rows
  if (!Array.isArray(rows)) return { refused: "the pages answered a question with no rows" }
  const at = typeof said.at === "string" ? { at: said.at } : {}
  const n = said.n
  if (typeof n === "number") return { rows: rows as readonly Row[], n, ...at }
  if (query.limit !== undefined || query.offset !== undefined) return { refused: NO_COUNT_SAYS }
  return { rows: rows as readonly Row[], n: rows.length, ...at }
}

export async function shapeFor(
  pageTypeSlug: string,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Shaped> {
  const held = await sentTo(SHAPE_AT, { pageTypeSlug }, ASK_CEILING_MS, fetcher, naps)
  if ("refused" in held) return held
  const said = objectIn(held.said)
  if (said === null) {
    return { refused: "the pages answered a shape with something no shape can be read out of" }
  }
  const shape = said.shape
  if (shape === undefined) return { refused: "the pages answered a shape holding no shape" }
  if (shape !== null && (typeof shape !== "object" || Array.isArray(shape))) {
    return { refused: "the pages answered a shape that states no page type" }
  }
  return held.said as Shaped
}

export async function shapesFor(
  pageTypeSlugs: readonly string[],
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<ShapedEvery> {
  const held = await sentTo(SHAPE_AT, { pageTypeSlugs }, SHAPES_CEILING_MS, fetcher, naps)
  if ("refused" in held) return held
  const shapes = objectIn(objectIn(held.said)?.shapes)
  if (shapes === null) return { refused: "the pages answered shapes holding no shapes" }
  for (const pageTypeSlug of pageTypeSlugs) {
    const shape = shapes[pageTypeSlug]
    if (shape === undefined) {
      return { refused: `the pages answered shapes holding none for \`${pageTypeSlug}\`` }
    }
    if (shape !== null && objectIn(shape) === null) {
      return {
        refused: `the pages answered a shape for \`${pageTypeSlug}\` that states no page type`,
      }
    }
  }
  return held.said as ShapedEvery
}

export async function readingFor(
  sought: Sought,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Read> {
  const held = await sentTo(READ_AT, sought, ASK_CEILING_MS, fetcher, naps)
  if ("refused" in held) return held
  const said = objectIn(held.said)
  if (said === null) {
    return { refused: "the pages answered a read with something no bodies can be read out of" }
  }
  if (typeof said.at !== "string" || !Array.isArray(said.bodies)) {
    return { refused: "the pages answered a read naming no commit and no bodies" }
  }
  return held.said as Read
}

type Asking = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly key: string
}

type Fetched = { readonly bytes: Uint8Array<ArrayBuffer> } | { readonly refused: string }

async function refusalIn(answered: Response): Promise<string> {
  try {
    return refusedIn(await answered.json()) ?? `the pages answered ${answered.status}`
  } catch {
    return `the pages answered ${answered.status} and the ${bytesSaid(answered)} said no reason`
  }
}

export async function filingFor(
  asked: Asking,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Fetched> {
  let why = "nothing came back"
  for (let taken = 1; taken <= ATTEMPTS; taken += 1) {
    try {
      const answered = await fetcher(`${originOf()}${FILE_AT}`, {
        method: "POST",
        headers: { "content-type": "application/json", ...askerHeaders() },
        body: JSON.stringify(asked),
        signal: AbortSignal.timeout(FILE_CEILING_MS),
      })
      if (answered.ok) return { bytes: new Uint8Array(await answered.arrayBuffer()) }
      const refused = await refusalIn(answered)
      if (answered.status < STATUS_FOR.service && answered.status !== STATUS_FOR.race) {
        return { refused }
      }
      why = refused
    } catch (thrown) {
      why = thrown instanceof Error ? thrown.message : String(thrown)
    }
    if (taken < ATTEMPTS) await naps(backoffFor(taken))
  }
  return { refused: `${why} — ${ATTEMPTS} attempts reached ${originOf()}${FILE_AT}` }
}

export async function appendingFor(
  asked: Appending,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Appended> {
  const held = await sentTo(APPEND_AT, asked, APPEND_CEILING_MS, fetcher, naps)
  if ("refused" in held) return held
  const said = objectIn(held.said)
  if (said === null || typeof said.appended !== "string") {
    return { refused: "the pages answered an append naming no file part" }
  }
  return held.said as Appended
}

type Placing = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly key: string
  readonly ending: string
  readonly bytes: Uint8Array
}

type Placed = { readonly placed: string } | { readonly refused: string }

const CHUNK = 0x8000

function base64Of(bytes: Uint8Array): string {
  let held = ""
  for (let at = 0; at < bytes.length; at += CHUNK) {
    held += String.fromCharCode(...bytes.subarray(at, at + CHUNK))
  }
  return btoa(held)
}

export async function placingFor(
  asked: Placing,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Placed> {
  const body = { ...asked, bytes: base64Of(asked.bytes) }
  const held = await sentTo(PLACE_AT, body, PLACE_CEILING_MS, fetcher, naps)
  if ("refused" in held) return held
  const said = objectIn(held.said)
  if (said === null || typeof said.placed !== "string") {
    return { refused: "the pages answered a placing naming no path" }
  }
  return { placed: said.placed }
}

export async function incrementingFor(
  asked: Incrementing,
  fetcher: Fetcher = fetchThrough
): Promise<Incremented> {
  const at = `${originOf()}${INCREMENT_AT}`
  const once = `${at} was reached once, since an increment sent again could be counted twice`
  try {
    const answered = await fetcher(at, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(asked),
      signal: AbortSignal.timeout(WRITE_CEILING_MS),
    })
    const got = await takenFrom(answered)
    if ("unreadable" in got) return { refused: `${got.unreadable} — ${once}` }
    const refused = refusedIn(got.held)
    if (refused !== null) return { refused }
    const value = objectIn(got.held)?.value
    if (!answered.ok || (value !== null && typeof value !== "number")) {
      return { refused: `the pages answered an increment ${answered.status} naming no count` }
    }
    return { value }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { refused: `${why} — ${once}` }
  }
}

export async function eventsOpened(
  signal: AbortSignal,
  fetcher: Fetcher = fetchThrough
): Promise<Response> {
  return await fetcher(`${originOf()}${EVENTS_AT}`, {
    method: "GET",
    headers: { accept: "text/event-stream" },
    signal,
  })
}

export async function followSent(
  body: unknown,
  fetcher: Fetcher = fetchThrough
): Promise<Response> {
  return await fetcher(`${originOf()}${FOLLOW_AT}`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(ASK_CEILING_MS),
  })
}

export async function writingFor(
  asked: Writing,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep,
  origin?: string
): Promise<Wrote> {
  const unread = asked.read === undefined
  const held = await sentTo(WRITE_AT, asked, WRITE_CEILING_MS, fetcher, naps, origin, unread)
  if ("refused" in held) return held
  const said = objectIn(held.said)
  if (said === null) {
    return { refused: "the pages answered a write with something no commit can be read out of" }
  }
  if (!Array.isArray(said.wrote)) {
    return { refused: "the pages answered a write saying nothing about what it wrote" }
  }
  return held.said as Wrote
}
