import { z } from "zod"

export interface CommsInput {
  readonly sender: string
  readonly content: string
}

export interface SmsExternalIdentity {
  readonly phoneDigits: string
  readonly accountUserId: string
  readonly smsAllowed: boolean
  readonly handlerTarget: string | null
}

export type SmsRouteDecision =
  | {
      readonly kind: "helper"
      readonly target: string
      readonly accountUserId: string | null
      readonly reason: string
    }
  | { readonly kind: "discard"; readonly sender: string; readonly reason: string }
  | { readonly kind: "drop"; readonly reason: string }
  | { readonly kind: "refuse"; readonly accountUserId: string; readonly reason: string }

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1)
  return digits
}

export const relationshipSmsRowSchema = z.object({
  phone: z.string().optional(),
  accountUserId: z.string().optional(),
  smsAllowed: z.boolean().optional(),
  smsHandlerTarget: z.string().nullish(),
})
export type RelationshipSmsRow = z.infer<typeof relationshipSmsRowSchema>

export function projectSmsIdentities(
  rows: readonly RelationshipSmsRow[]
): readonly SmsExternalIdentity[] {
  const out: SmsExternalIdentity[] = []
  for (const row of rows) {
    if (row.accountUserId === undefined || row.accountUserId.length === 0) continue
    const phoneDigits = normalizePhone(row.phone ?? "")
    if (phoneDigits.length === 0) continue
    const target = row.smsHandlerTarget?.trim() ?? ""
    out.push({
      phoneDigits,
      accountUserId: row.accountUserId,
      smsAllowed: row.smsAllowed === true,
      handlerTarget: target.length > 0 ? target : null,
    })
  }
  return out
}

export function decideSmsRoute(
  input: CommsInput,
  identities: readonly SmsExternalIdentity[]
): SmsRouteDecision {
  const senderDigits = normalizePhone(input.sender)
  if (senderDigits.length > 0) {
    const match = identities.find((i) => i.phoneDigits === senderDigits)
    if (match !== undefined) {
      if (match.smsAllowed) {
        if (match.handlerTarget === null) {
          return {
            kind: "refuse",
            accountUserId: match.accountUserId,
            reason: "enrolled sms identity records no handler of its own → refuse",
          }
        }
        return {
          kind: "helper",
          target: match.handlerTarget,
          accountUserId: match.accountUserId,
          reason: `allowlisted sms identity → ${match.handlerTarget}`,
        }
      }
      return {
        kind: "drop",
        reason: "matched enrolled identity without smsAllowed → drop (fail-closed)",
      }
    }
  }

  return {
    kind: "discard",
    sender: input.sender,
    reason: "sender matches no enrolled sms identity → discard (whitelist)",
  }
}
