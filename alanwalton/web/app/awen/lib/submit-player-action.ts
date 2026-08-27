import { z } from "zod"
import { apiFetch } from "~/lib/api-fetch"
import { isAuthFailure, SIGNED_OUT_MESSAGE } from "~/lib/auth-error"

export const PlayerActionInputSchema = z.object({
  gameExternalId: z.string().min(1),
  text: z.string().min(1),
})
export type PlayerActionInput = z.infer<typeof PlayerActionInputSchema>

export type PlayerActionResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: string; readonly signedOut?: boolean }

const PlayerActionResponseSchema = z.union([
  z.object({ ok: z.literal(true) }),
  z.object({ ok: z.literal(false), error: z.string() }),
])

export async function submitPlayerAction(input: PlayerActionInput): Promise<PlayerActionResult> {
  const parsed = PlayerActionInputSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: "Please enter an action." }
  }
  try {
    const res = await apiFetch("/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    })
    if (isAuthFailure(res)) {
      return { ok: false, signedOut: true, error: SIGNED_OUT_MESSAGE }
    }
    const body = PlayerActionResponseSchema.safeParse(await res.json())
    if (!body.success) {
      return { ok: false, error: "The game did not respond. Try again." }
    }
    return body.data
  } catch {
    return { ok: false, error: "The game did not respond. Try again." }
  }
}
