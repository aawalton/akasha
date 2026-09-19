import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

export type Movement = {
  readonly chargeId: string
  readonly email: string
  readonly points: number
}

export type Read = { readonly movement: Movement } | { readonly passedOver: string }

const SUCCEEDED = "charge.succeeded"

const REFUNDED = "charge.refunded"

type Held = Readonly<Record<string, unknown>>

function objectIn(said: unknown): Held | null {
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  return said as Held
}

function centsIn(held: unknown): number | null {
  return typeof held === "number" && Number.isSafeInteger(held) && held >= 0 ? held : null
}

function addressIn(charge: Held): string | null {
  const billed = objectIn(charge.billing_details)
  const said = textIn(billed?.email) ?? textIn(charge.receipt_email)
  return said === null ? null : said.toLowerCase()
}

export function movementIn(event: unknown): Read {
  const held = objectIn(event)
  if (held === null) return { passedOver: "the body is no object" }

  const kind = textIn(held.type)
  if (kind === null) return { passedOver: "the body names no event type" }
  if (kind !== SUCCEEDED && kind !== REFUNDED) return { passedOver: `\`${kind}\` moves no points` }

  const data = objectIn(held.data)
  const charge = data === null ? null : objectIn(data.object)
  if (charge === null) return { passedOver: `\`${kind}\` carries no charge` }

  const chargeId = textIn(charge.id)
  if (chargeId === null) return { passedOver: `\`${kind}\` carries a charge with no id` }

  const email = addressIn(charge)
  if (email === null) return { passedOver: `\`${chargeId}\` names no address` }

  if (kind === SUCCEEDED) {
    const amount = centsIn(charge.amount)
    if (amount === null) return { passedOver: `\`${chargeId}\` states no amount` }
    if (amount === 0) return { passedOver: `\`${chargeId}\` is for nothing` }
    return { movement: { chargeId, email, points: amount } }
  }

  const refunded = centsIn(charge.amount_refunded)
  if (refunded === null) return { passedOver: `\`${chargeId}\` states no amount refunded` }
  if (refunded === 0) return { passedOver: `\`${chargeId}\` refunded nothing` }
  return { movement: { chargeId, email, points: -refunded } }
}

export async function hashOf(email: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}
