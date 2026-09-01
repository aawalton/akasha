export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export type Sleeper = (ms: number) => Promise<void>

export type Reached<T> =
  | { readonly ok: true; readonly body: T }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export const PAGE_STORE_ORIGIN = "http://page-store.page-store.svc.cluster.local:8787"

export const PAGE_STORE_BROWSER_PREFIX = "/api"

export const ASK_CEILING_MS = 5_000

export const WRITE_CEILING_MS = 30_000

export const ATTEMPTS = 4

export const FIRST_BACKOFF_MS = 250

export const BACKOFF_CEILING_MS = 4_000

const ORIGIN_NAMES = ["PAGE_STORE_ORIGIN", "PAGE_QUERY_ORIGIN"]

let chosen: Fetcher | null = null

export function fetchThrough(fetcher: Fetcher | null): undefined {
  chosen = fetcher
}

export function pagesFetcher(): Fetcher {
  return chosen ?? (fetch as Fetcher)
}

export const sleep: Sleeper = (ms) =>
  new Promise((done) => {
    setTimeout(done, ms)
  })

export function backoffFor(attempt: number): number {
  const flat = Math.min(FIRST_BACKOFF_MS * 2 ** (attempt - 1), BACKOFF_CEILING_MS)
  return flat + Math.floor(Math.random() * (flat / 2))
}

export function worthRetrying(status: number | undefined): boolean {
  if (status === undefined) return true
  return status >= 500 || status === 429
}

function statedOrigin(): string | undefined {
  if (typeof process === "undefined") return undefined
  for (const name of ORIGIN_NAMES) {
    const held: unknown = process.env?.[name]
    if (typeof held === "string" && held.trim() !== "") return held.trim()
  }
  return undefined
}

function browserOrigin(): string | null {
  const held: unknown = (globalThis as { location?: { origin?: unknown } }).location?.origin
  if (typeof held !== "string" || held === "" || held === "null") return null
  return held
}

export function pageStoreOrigin(): string {
  const stated = statedOrigin()
  if (stated !== undefined) return stated.replace(/\/+$/, "")
  const origin = browserOrigin()
  if (origin !== null) return `${origin}${PAGE_STORE_BROWSER_PREFIX}`
  return PAGE_STORE_ORIGIN
}

function refusalIn(body: unknown): string {
  if (typeof body !== "object" || body === null) return ""
  if ("refused" in body) return `: ${String((body as { refused: unknown }).refused)}`
  if ("error" in body) return `: ${String((body as { error: unknown }).error)}`
  return ""
}

async function postedOnce(
  url: string,
  what: string,
  body: unknown,
  fetcher: Fetcher,
  ceiling: number
): Promise<Reached<unknown>> {
  let response: Response
  try {
    response = await fetcher(url, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(ceiling),
    })
  } catch (cause) {
    return {
      ok: false,
      why: `\`${what}\` went unanswered: ${url} gave nothing back within ${ceiling}ms (${String(cause)})`,
    }
  }
  let parsed: unknown
  try {
    parsed = await response.json()
  } catch (cause) {
    return {
      ok: false,
      why: `\`${what}\` answered with what is not JSON (${String(cause)})`,
      status: response.status,
    }
  }
  if (!response.ok) {
    return {
      ok: false,
      why: `\`${what}\` was refused: the page store replied ${response.status}${refusalIn(parsed)}`,
      status: response.status,
    }
  }
  return { ok: true, body: parsed }
}

export function attemptsSaid(spent: number): string {
  return spent === 1 ? "one attempt was spent" : `${spent} attempts were spent`
}

export async function postingTo(
  path: string,
  what: string,
  body: unknown,
  fetcher: Fetcher = pagesFetcher(),
  ceiling: number = ASK_CEILING_MS,
  naps: Sleeper = sleep
): Promise<Reached<unknown>> {
  const url = `${pageStoreOrigin()}${path}`
  let spent = 1
  let held = await postedOnce(url, what, body, fetcher, ceiling)
  while (spent < ATTEMPTS && !held.ok && worthRetrying(held.status)) {
    await naps(backoffFor(spent))
    held = await postedOnce(url, what, body, fetcher, ceiling)
    spent += 1
  }
  if (held.ok) return held
  const said = attemptsSaid(spent)
  return {
    ...held,
    why: `${held.why} — ${held.status === undefined ? `${said} and nothing came back` : said}`,
  }
}
