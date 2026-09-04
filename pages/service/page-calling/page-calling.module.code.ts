import type { Query, Row, Asked as Rows, Shaped } from "../page-asking/page-asking.module.code.ts"
import type { Naming } from "../page-composing/page-composing.module.code.ts"
import type { Read, Asked as Sought } from "../page-reading/page-reading.module.code.ts"
import type { Put, Wrote } from "../page-writing/page-writing.module.code.ts"

export const ASK_AT = "/ask"

export const READ_AT = "/read"

export const WRITE_AT = "/write"

export const SHAPE_AT = "/shape"

export const ORIGIN_NAMES: readonly string[] = ["PAGES_SERVICE_ORIGIN", "PAGE_STORE_ORIGIN"]

export const OVER_THE_TAILNET = "http://page-store.page-store.svc.cluster.local:8787"

export const IN_A_BROWSER = "/api"

export const ASK_CEILING_MS = 5000

export const WRITE_CEILING_MS = 30000

export const ATTEMPTS = 4

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export type Sleeper = (waited: number) => Promise<void>

export type Writing = {
  readonly writer: string
  readonly message: string
  readonly puts?: readonly Put[]
  readonly removes?: readonly string[]
  readonly pages?: readonly Naming[]
  readonly read?: string
}

function saidIn(name: string): string | null {
  const held = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
  const said = held?.env?.[name]
  return said === undefined || said === "" ? null : said
}

function browserOrigin(): string | null {
  const held = (globalThis as { location?: { origin?: string } }).location
  const said = held?.origin
  return typeof said === "string" && said !== "" ? said : null
}

export function originOf(named: readonly string[] = ORIGIN_NAMES): string {
  for (const one of named) {
    const said = saidIn(one)
    if (said !== null) return said.replace(/\/+$/, "")
  }
  const here = browserOrigin()
  return here === null ? OVER_THE_TAILNET : `${here}${IN_A_BROWSER}`
}

export function backoffFor(taken: number): number {
  return 100 * 2 ** (taken - 1)
}

export const sleep: Sleeper = (waited) =>
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
  naps: Sleeper
): Promise<Sent> {
  let why = "nothing came back"
  for (let taken = 1; taken <= ATTEMPTS; taken += 1) {
    try {
      const answered = await fetcher(`${originOf()}${at}`, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(ceiling),
      })
      const got = await takenFrom(answered)
      if ("unreadable" in got) return { refused: got.unreadable }
      const refused = refusedIn(got.held)
      if (refused !== null) return { refused }
      if (answered.ok) return { said: got.held }
      why = `the pages answered ${answered.status}`
    } catch (thrown) {
      why = thrown instanceof Error ? thrown.message : String(thrown)
    }
    if (taken < ATTEMPTS) await naps(backoffFor(taken))
  }
  return { refused: `${why} — ${ATTEMPTS} attempts reached ${originOf()}${at}` }
}

function objectIn(said: unknown): Readonly<Record<string, unknown>> | null {
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
  return { rows: rows as readonly Row[] }
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

export async function writingFor(
  asked: Writing,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Wrote> {
  const held = await sentTo(WRITE_AT, asked, WRITE_CEILING_MS, fetcher, naps)
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
