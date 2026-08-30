import type { Given, QueryAnswer, QueryRow } from "./readout-resolver.ts"

export function paramsIn(given: Given): URLSearchParams {
  const carried = new URLSearchParams()
  for (const [key, held] of Object.entries(given)) {
    if (Array.isArray(held)) for (const one of held) carried.append(key, one)
    else carried.append(key, held as string)
  }
  return carried
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
