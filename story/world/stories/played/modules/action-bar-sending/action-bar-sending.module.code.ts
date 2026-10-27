import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { SendCause } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import type { PlayerActionInput } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"

export const ACTION_BAR_AT = "/api/action-bar"

const NO_ANSWER = "The game did not respond. Try again."

const SIGNED_OUT = "Sign in to send an action."

const UNAUTHORIZED = 401

export type Fetching = (input: string, init?: RequestInit) => Promise<Response>

type Sent =
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

type InputBeforeSend = { readonly inputType: string; readonly ms: number }

type SentBy = SendCause & {
  readonly length: number
  readonly boxLength: number | null
  readonly lastInput: InputBeforeSend | null
  readonly startedAfterSend: InputBeforeSend | null
}

type ActionSent = PlayerActionInput & { readonly sentBy?: SentBy }

export async function sendAction(input: ActionSent, fetching: Fetching = apiFetch): Promise<Sent> {
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

type Drafted = { readonly draft: string | null }

export async function readDraft(
  gameExternalId: string,
  fetching: Fetching = apiFetch
): Promise<Drafted | null> {
  try {
    const answered = await fetching(`${ACTION_BAR_AT}?game=${encodeURIComponent(gameExternalId)}`)
    if (!answered.ok) return null
    const body = await bodyOf(answered)
    if (body === null || body["ok"] !== true) return null
    return { draft: textIn(body["draft"]) }
  } catch {
    return null
  }
}
