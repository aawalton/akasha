import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { Wanted } from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import type { Fetching } from "akasha/story/world/stories/played/modules/action-bar-sending/action-bar-sending.module.code.ts"

export const HELD_ABILITY_AT = "/api/held-ability"

export const SHEET_CHANGED = "akasha-sheet-changed"

const NO_ANSWER = "The game did not respond. Try again."

const SIGNED_OUT = "Sign in to change your sheet."

const UNAUTHORIZED = 401

export type HeldAsk = {
  readonly gameExternalId: string
  readonly held: string
  readonly wanted: Wanted
}

export type HeldSent =
  | { readonly ok: true; readonly event: string }
  | { readonly ok: false; readonly error: string }

export function sheetChanged(): undefined {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(SHEET_CHANGED))
  return undefined
}

export async function sendHeldAbility(
  ask: HeldAsk,
  fetching: Fetching = apiFetch,
  changed: () => undefined = sheetChanged
): Promise<HeldSent> {
  try {
    const answered = await fetching(HELD_ABILITY_AT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ask),
    })
    if (answered.status === UNAUTHORIZED) return { ok: false, error: SIGNED_OUT }
    const body: unknown = await answered.json().catch(() => null)
    if (!isRecord(body)) return { ok: false, error: NO_ANSWER }
    const event = textIn(body["event"])
    if (body["ok"] === true && event !== null) {
      changed()
      return { ok: true, event }
    }
    return { ok: false, error: textIn(body["error"]) ?? NO_ANSWER }
  } catch {
    return { ok: false, error: NO_ANSWER }
  }
}
