import { z } from "zod"
import { apiFetch } from "~/lib/api-fetch"
import { isAuthFailure, SIGNED_OUT_MESSAGE } from "~/lib/auth-error"

export type ResolveAction = "answer" | "dismiss"

export type ResolveResult =
  | { readonly ok: true; readonly nextHref: string | null }
  | { readonly ok: false; readonly error: string; readonly signedOut?: boolean }

const ResolveAckSchema = z.object({ ok: z.literal(true), nextHref: z.string().nullable() })

export async function resolveQuestion(input: {
  questionId: string
  action: ResolveAction
  content?: string
  answeredOptionIndex?: number
}): Promise<ResolveResult> {
  const body =
    input.action === "answer"
      ? {
          questionId: input.questionId,
          action: "answer",
          content: input.content ?? "",
          ...(input.answeredOptionIndex === undefined
            ? {}
            : { answeredOptionIndex: input.answeredOptionIndex }),
        }
      : { questionId: input.questionId, action: "dismiss" }
  try {
    const res = await apiFetch("/api/question/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (isAuthFailure(res)) {
      return { ok: false, signedOut: true, error: SIGNED_OUT_MESSAGE }
    }
    const parsed = ResolveAckSchema.safeParse(await res.json())
    if (!parsed.success) {
      return { ok: false, error: "That didn't go through. Try again." }
    }
    return { ok: true, nextHref: parsed.data.nextHref }
  } catch {
    return { ok: false, error: "That didn't go through. Try again." }
  }
}
