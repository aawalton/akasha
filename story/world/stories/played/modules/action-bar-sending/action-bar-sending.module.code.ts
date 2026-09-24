import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { ACTION_BAR_MESSAGE_KINDS } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import type { PlayerActionInput } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import type { PendingAction } from "akasha/story/world/stories/played/modules/action-bar-state/action-bar-state.module.code.ts"

export const ACTION_BAR_AT = "/api/action-bar"

const NO_ANSWER = "The game did not respond. Try again."

const SIGNED_OUT = "Sign in to send an action."

const UNAUTHORIZED = 401

export type Fetching = (input: string, init?: RequestInit) => Promise<Response>

export type Sent =
  | { readonly ok: true; readonly id: string }
  | { readonly ok: false; readonly error: string; readonly signedOut?: boolean }

async function bodyOf(answered: Response): Promise<Readonly<Record<string, unknown>> | null> {
  try {
    const held: unknown = await answered.json()
    return typeof held === "object" && held !== null && !Array.isArray(held)
      ? (held as Readonly<Record<string, unknown>>)
      : null
  } catch {
    return null
  }
}

export async function sendAction(
  input: PlayerActionInput,
  fetching: Fetching = apiFetch
): Promise<Sent> {
  try {
    const answered = await fetching(ACTION_BAR_AT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
    if (answered.status === UNAUTHORIZED) return { ok: false, signedOut: true, error: SIGNED_OUT }
    const body = await bodyOf(answered)
    if (body === null) return { ok: false, error: NO_ANSWER }
    const id = textIn(body["id"])
    if (body["ok"] === true && id !== null) return { ok: true, id }
    return { ok: false, error: textIn(body["error"]) ?? NO_ANSWER }
  } catch {
    return { ok: false, error: NO_ANSWER }
  }
}

function pendingIn(held: unknown): readonly PendingAction[] | null {
  if (!Array.isArray(held)) return null
  const found: PendingAction[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const said = one as Readonly<Record<string, unknown>>
    const id = textIn(said["id"])
    const text = textIn(said["text"])
    const kind = ACTION_BAR_MESSAGE_KINDS.find((named) => named === said["kind"])
    if (id !== null && text !== null && kind !== undefined) found.push({ id, text, kind })
  }
  return found
}

export async function readPending(
  gameExternalId: string,
  fetching: Fetching = apiFetch
): Promise<readonly PendingAction[] | null> {
  try {
    const answered = await fetching(`${ACTION_BAR_AT}?game=${encodeURIComponent(gameExternalId)}`)
    if (!answered.ok) return null
    const body = await bodyOf(answered)
    return body !== null && body["ok"] === true ? pendingIn(body["pending"]) : null
  } catch {
    return null
  }
}
