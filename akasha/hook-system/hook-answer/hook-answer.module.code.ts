import { rootOf } from "../../command-system/rooting/rooting.module.code.ts"

export const SCOPE_FLAG = "--scope"

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
  return {
    out: "",
    err: `${hook}: ${why}, so nothing was judged and the call was not refused`,
    code: UNREADABLE,
  }
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

export function payloadIn(raw: string): Record<string, unknown> | null {
  let held: unknown
  try {
    held = JSON.parse(raw)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Record<string, unknown>
}

export function inputIn(payload: Record<string, unknown>): Record<string, unknown> | null {
  const held = payload["tool_input"]
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Record<string, unknown>
}

export function rewriting(event: string, input: Readonly<Record<string, unknown>>): Answer {
  return {
    out: JSON.stringify({ hookSpecificOutput: { hookEventName: event, updatedInput: input } }),
    err: "",
    code: ASIDE,
  }
}

export function toldOf(hook: string, told: readonly string[]): string {
  return [`${hook} refused this call.`, "", ...told].join("\n")
}

export function said(answer: Answer): number {
  if (answer.out !== "") process.stdout.write(`${answer.out}\n`)
  if (answer.err !== "") process.stderr.write(`${answer.err}\n`)
  return answer.code
}

export function fromIn(raw: string): string {
  try {
    const payload: unknown = JSON.parse(raw)
    const held = (payload as Record<string, unknown> | null)?.["cwd"]
    return typeof held === "string" ? held : ""
  } catch {
    return ""
  }
}

export async function ranAsHook(
  hook: string,
  key: string,
  scope: readonly string[],
  at: string,
  judging: (command: string, from: string, root: string) => string | null
): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${scope.join("\n")}\n`)
    return ASIDE
  }
  const raw = await Bun.stdin.text()
  const read = commandIn(raw, key, hook)
  if ("answer" in read) return said(read.answer)
  const reason = judging(read.command, fromIn(raw), rootOf(at))
  return said(reason === null ? STANDING_ASIDE : refusing(reason))
}
