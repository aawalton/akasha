import type { Ask, Given, QueryAnswer, QueryRow } from "./readout-resolver.ts"

export type Fetching = (url: string, init: RequestInit) => Promise<Response>

const CEILING_MS = 5_000

export function askedUrl(origin: string, querySlug: string, given: Given): string {
  const carried = new URLSearchParams()
  for (const [key, held] of Object.entries(given)) {
    if (Array.isArray(held)) for (const one of held) carried.append(key, one)
    else carried.append(key, held as string)
  }
  const tail = carried.toString()
  return tail === "" ? `${origin}/q/${querySlug}` : `${origin}/q/${querySlug}?${tail}`
}

function numberOr(held: unknown, fallback: number): number {
  return typeof held === "number" && Number.isFinite(held) ? held : fallback
}

function numberOrNull(held: unknown): number | null {
  return typeof held === "number" && Number.isFinite(held) ? held : null
}

function stringsIn(held: unknown): readonly string[] {
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function rowsIn(held: unknown): readonly QueryRow[] {
  if (!Array.isArray(held)) return []
  const drawn: QueryRow[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const values = (one as { readonly values?: unknown }).values
    if (typeof values !== "object" || values === null) continue
    const at = (one as { readonly at?: unknown }).at
    const carried = values as Readonly<Record<string, unknown>>
    drawn.push(typeof at === "string" ? { at, values: carried } : { values: carried })
  }
  return drawn
}

export function answerIn(body: unknown): QueryAnswer {
  const held = (typeof body === "object" && body !== null ? body : {}) as Readonly<
    Record<string, unknown>
  >
  return {
    n: numberOr(held.n, 0),
    value: numberOrNull(held.value),
    over: numberOrNull(held.over),
    rows: rowsIn(held.rows),
    faults: stringsIn(held.faults),
    omitted: stringsIn(held.omitted),
    unfound: stringsIn(held.unfound),
  }
}

export function askOverHttp(
  origin: string,
  fetching?: Fetching,
  ceilingMs: number = CEILING_MS
): Ask {
  const reaching = fetching ?? fetch
  return async (querySlug, given) => {
    const url = askedUrl(origin, querySlug, given)
    let answered: Response
    try {
      answered = await reaching(url, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(ceilingMs),
      })
    } catch (cause) {
      throw new Error(
        `\`${querySlug}\` went unasked: ${url} gave no answer within ${ceilingMs}ms (${String(cause)})`
      )
    }
    if (!answered.ok) {
      throw new Error(
        `\`${querySlug}\` went unanswered: the page query service replied ${answered.status}`
      )
    }
    let body: unknown
    try {
      body = await answered.json()
    } catch (cause) {
      throw new Error(`\`${querySlug}\` replied with what is not JSON (${String(cause)})`)
    }
    return answerIn(body)
  }
}
