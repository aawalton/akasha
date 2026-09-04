import type { AmazonOrder } from "../amazon-order/monarch-amazon-order.module.code.ts"
import type { AmazonRefund } from "../amazon-refund/monarch-amazon-refund.module.code.ts"
import { cents } from "../transaction/monarch-transaction.module.code.ts"

export const MATCH_WINDOW_DAYS = 10

export const REFUND_DAYS_BEFORE = 3
export const REFUND_DAYS_AFTER = 21

export const MAX_NOTE_CHARS = 900

export interface Movement {
  readonly monarchId: string
  readonly date: string
  readonly amountCents: number
}

export interface Match<T> {
  readonly movement: Movement
  readonly candidate: T
}

export interface Ambiguity<T> {
  readonly movement: Movement
  readonly candidates: readonly T[]
}

export interface Partition<T> {
  readonly unique: readonly Match<T>[]
  readonly ambiguous: readonly Ambiguity<T>[]
  readonly unmatched: readonly Movement[]
}

const DAY_MS = 86_400_000

export function daysAfter(from: string, to: string): number {
  const start = Date.parse(`${from.slice(0, 10)}T00:00:00Z`)
  const end = Date.parse(`${to.slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new Error(`"${from}" to "${to}" is not a pair of dates, so no window spans them`)
  }
  return Math.round((end - start) / DAY_MS)
}

export function accountsFor(order: AmazonOrder, movement: Movement): boolean {
  if (movement.amountCents >= 0) return false
  if (order.totalCents === null) return false
  if (order.totalCents !== Math.abs(movement.amountCents)) return false
  const gap = daysAfter(order.orderDate, movement.date)
  return gap >= 0 && gap <= MATCH_WINDOW_DAYS
}

export function refundAccountsFor(refund: AmazonRefund, movement: Movement): boolean {
  if (movement.amountCents <= 0) return false
  if (refund.totalCents !== movement.amountCents) return false
  const gap = daysAfter(refund.refundDate, movement.date)
  return gap >= -REFUND_DAYS_BEFORE && gap <= REFUND_DAYS_AFTER
}

export function partition<T>(
  movements: readonly Movement[],
  candidates: readonly T[],
  accounts: (candidate: T, movement: Movement) => boolean
): Partition<T> {
  const unique: Match<T>[] = []
  const ambiguous: Ambiguity<T>[] = []
  const unmatched: Movement[] = []
  for (const movement of movements) {
    const hits = candidates.filter((candidate) => accounts(candidate, movement))
    const [only] = hits
    if (hits.length === 1 && only !== undefined) unique.push({ movement, candidate: only })
    else if (hits.length > 1) ambiguous.push({ movement, candidates: hits })
    else unmatched.push(movement)
  }
  return { unique, ambiguous, unmatched }
}

export function soleProduct(orders: readonly AmazonOrder[], orderNumber: string): string | null {
  const named = orders
    .filter((o) => o.orderNumber === orderNumber)
    .flatMap((o) => o.items.map((i) => i.name))
  const distinct = [...new Set(named)]
  return distinct.length === 1 ? (distinct[0] ?? null) : null
}

function itemPhrase(name: string, quantity: number): string {
  return quantity > 1 ? `${name} (x ${quantity})` : name
}

function withSuffix(body: string, suffix: string): string {
  const room = MAX_NOTE_CHARS - suffix.length
  const cut = body.length > room ? `${body.slice(0, room - 1).trimEnd()}…` : body
  return `${cut}${suffix}`
}

export function noteFor(order: AmazonOrder): string {
  const named =
    order.items.length > 0
      ? order.items.map((i) => itemPhrase(i.name, i.quantity)).join("; ")
      : order.summary
  return withSuffix(named, ` — Amazon order ${order.orderNumber}`)
}

export function noteForRefund(refund: AmazonRefund, product: string): string {
  const reason = refund.reason === null ? "" : ` — returned: ${refund.reason}`
  return withSuffix(`Refund — ${product}`, `${reason} — Amazon order ${refund.orderNumber}`)
}

export function movementOf(monarchId: string, date: string, amount: number): Movement {
  return { monarchId, date: date.slice(0, 10), amountCents: cents(amount) }
}
