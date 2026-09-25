import { resolve, sep } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { z } from "zod"

const PAYLOAD_SHAPE = z.looseObject({})

export function parseHookPayload(raw: string): Record<string, unknown> | null {
  const read = PAYLOAD_SHAPE.safeParse(JSON.parse(raw))
  return read.success ? read.data : null
}

export const SCOPE_FLAG = "--scope"

export const ASIDE = 0

export const REFUSED = 2

export const UNREADABLE = 5

export type Answer = {
  readonly out: string
  readonly err: string
  readonly code: number
}

export const LET_THROUGH: Answer = { out: "", err: "", code: ASIDE }

export function passing(why: string): Answer {
  return { out: "", err: why, code: ASIDE }
}

export function unreadable(hook: string, why: string): Answer {
  return {
    out: "",
    err: `${hook}: ${why}, so nothing was judged and the dispatch passes the call`,
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

const REFUSAL_SHAPE = z.object({ decision: z.literal("block"), reason: z.string() })

type Refusal = { readonly decision: "block"; readonly reason: string }

export function parseRefusal(raw: string): Refusal {
  return REFUSAL_SHAPE.parse(JSON.parse(raw))
}

export function refusing(reason: string): Answer {
  return {
    out: JSON.stringify({ decision: "block", reason }, null, 2),
    err: reason,
    code: REFUSED,
  }
}

export function payloadIn(raw: string): Record<string, unknown> | null {
  try {
    return parseHookPayload(raw)
  } catch {
    return null
  }
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

export function guarding(from: string, root: string): boolean {
  if (from.trim() === "") return true
  const at = resolve(from)
  return at === root || at.startsWith(`${root}${sep}`)
}

export const JUDGE = "judgedFor"

export type Judging = (payload: Record<string, unknown>) => Answer | Promise<Answer>

type Payloaded = { readonly payload: Record<string, unknown> } | { readonly answer: Answer }

function payloadOf(raw: string, hook: string): Payloaded {
  if (raw.trim() === "") return { payload: {} }
  let read: Record<string, unknown> | null
  try {
    read = parseHookPayload(raw)
  } catch {
    return { answer: unreadable(hook, "the hook payload would not parse") }
  }
  if (read === null) return { answer: unreadable(hook, "the hook payload is not an object") }
  return { payload: read }
}

function fromOf(payload: Record<string, unknown>): string {
  const held = payload["cwd"]
  return typeof held === "string" ? held : ""
}

function judgingHook(
  hook: string,
  key: string,
  at: string,
  judging: (command: string, from: string, root: string) => string | null
): (payload: Record<string, unknown>) => Answer {
  return (payload: Record<string, unknown>): Answer => {
    const held = toolInputIn(payload, key)
    if (held === null) return unreadable(hook, "the hook payload is not an object")
    const reason = judging(held, fromOf(payload), rootOf(at))
    return reason === null ? LET_THROUGH : refusing(reason)
  }
}

export function judgingCommandHook(
  hook: string,
  at: string,
  judging: (command: string, from: string, root: string) => string | null
): (payload: Record<string, unknown>) => Answer {
  return judgingHook(hook, "command", at, judging)
}

export async function ranAsJudgedOnly(hook: string, judged: Judging): Promise<number> {
  const raw = await Bun.stdin.text()
  if (raw.trim() === "") return ASIDE
  const payload = payloadIn(raw)
  if (payload === null) return said(unreadable(hook, "the hook payload would not read"))
  return said(await judged(payload))
}

export async function ranAsJudged(
  hook: string,
  scope: readonly string[],
  judged: Judging
): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${scope.join("\n")}\n`)
    return ASIDE
  }
  const read = payloadOf(await Bun.stdin.text(), hook)
  if ("answer" in read) return said(read.answer)
  return said(await judged(read.payload))
}
