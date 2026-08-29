export const ASIDE = 0

export const REFUSED = 2

export const UNREADABLE = 5

export type Answer = {
  readonly out: string
  readonly err: string
  readonly code: number
}

export type Read = { readonly command: string } | { readonly answer: Answer }

export const STANDING_ASIDE: Answer = { out: "", err: "", code: ASIDE }

function unreadable(hook: string, why: string): Answer {
  return { out: "", err: `${hook}: ${why}, so nothing was checked`, code: UNREADABLE }
}

function texted(held: unknown): string {
  if (held === null || held === undefined || held === false) return ""
  return typeof held === "string" ? held : String(held)
}

export function toolInputIn(payload: unknown, key: string): string | null {
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) return null
  const input = (payload as Record<string, unknown>)["tool_input"]
  if (input === null || input === undefined) return ""
  if (typeof input !== "object" || Array.isArray(input)) return null
  return texted((input as Record<string, unknown>)[key])
}

export function commandIn(raw: string, key: string, hook: string): Read {
  if (raw.trim() === "") return { command: "" }
  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return { answer: unreadable(hook, "the hook payload would not parse") }
  }
  const held = toolInputIn(payload, key)
  if (held === null) return { answer: unreadable(hook, "the hook payload is not an object") }
  return { command: held }
}

export function refusing(reason: string): Answer {
  return {
    out: JSON.stringify({ decision: "block", reason }, null, 2),
    err: reason,
    code: REFUSED,
  }
}

export function said(answer: Answer): number {
  if (answer.out !== "") process.stdout.write(`${answer.out}\n`)
  if (answer.err !== "") process.stderr.write(`${answer.err}\n`)
  return answer.code
}
