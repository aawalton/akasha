const SESSION = "session-tracking"

const SAFETY_LEVEL = "safety-level"

const END_TIME = "end-time"

const START_TIME = "start-time"

export const OPEN_SESSION = {
  "page-type": SESSION,
  where: { [END_TIME]: { empty: true } },
  "sort-by": START_TIME,
  descending: true,
  limit: 1,
} as const

export type Row = { readonly values: Readonly<Record<string, unknown>> }

export type Answered =
  | { readonly ok: true; readonly rows: readonly Row[] }
  | { readonly ok: false; readonly why: string }

export type Asking = (query: Readonly<Record<string, unknown>>) => Promise<Answered>

export function levelIn(values: Readonly<Record<string, unknown>>): number | null {
  const held = values[SAFETY_LEVEL]
  if (typeof held !== "number" && typeof held !== "string") return null
  const trimmed = typeof held === "string" ? held.trim() : held
  if (trimmed === "") return null
  const level = Number(trimmed)
  return Number.isFinite(level) ? level : null
}

export async function fetchSafetyLevel(ask: Asking): Promise<number | null> {
  const asked = await ask(OPEN_SESSION)
  if (!asked.ok) {
    throw new Error(
      `the open session could not be read, so the safety level is unknown rather than nothing: ${asked.why}`
    )
  }
  const [row] = asked.rows
  if (row === undefined) return null
  return levelIn(row.values)
}
