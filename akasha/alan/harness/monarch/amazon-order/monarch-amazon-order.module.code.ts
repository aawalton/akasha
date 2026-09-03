
import type { EmailMessage } from "../gmail-cache/monarch-gmail-cache.module.code.ts"

const MONEY = /([\d,]+(?:\.\d+)?)\s*USD/

const ORDER_NUMBER = /\b(\d{3}-\d{7}-\d{7})\b/

const GRAND_TOTAL = /Grand Total:\s*([\d,]+(?:\.\d+)?)\s*USD/

const ITEM_NAME = /^\*\s+(.*\S)\s*$/

const QUANTITY = /^\s*Quantity:\s*(\d+)\s*$/

const BIDI = /[⁦-⁩‎‏]/g

export interface OrderItem {
  readonly name: string
  readonly quantity: number
  readonly unitCents: number | null
}

export interface AmazonOrder {
  readonly messageId: string
  readonly orderNumber: string
  readonly orderDate: string
  readonly totalCents: number | null
  readonly summary: string
  readonly items: readonly OrderItem[]
}

export function centsFromMoney(text: string): number | null {
  const found = MONEY.exec(text)
  if (found === null) return null
  return Math.round(Number(found[1].replace(/,/g, "")) * 100)
}

export function orderNumberIn(body: string): string | null {
  const found = ORDER_NUMBER.exec(body)
  return found === null ? null : found[1]
}

export function messageDate(header: string): string {
  const at = Date.parse(header)
  if (Number.isNaN(at)) {
    throw new Error(`"${header}" is not a date, so nothing could have been sent on it`)
  }
  return new Date(at).toISOString().slice(0, 10)
}

export function summaryFromSubject(subject: string): string {
  const clean = subject.replace(BIDI, "").trim()
  const colon = clean.indexOf(":")
  return (colon === -1 ? clean : clean.slice(colon + 1)).trim()
}

export function itemsFromBody(body: string): readonly OrderItem[] {
  const items: OrderItem[] = []
  let name: string | null = null
  let quantity = 1
  let unitCents: number | null = null
  const close = (): void => {
    if (name !== null) items.push({ name, quantity, unitCents })
    name = null
    quantity = 1
    unitCents = null
  }
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.replace(/\r$/, "")
    const named = ITEM_NAME.exec(line)
    if (named !== null) {
      close()
      name = named[1].replace(BIDI, "").trim()
      continue
    }
    if (name === null) continue
    const counted = QUANTITY.exec(line)
    if (counted !== null) {
      quantity = Number(counted[1])
      continue
    }
    if (unitCents === null && /^\s*[\d,]+(?:\.\d+)?\s*USD\s*$/.test(line)) {
      unitCents = centsFromMoney(line)
      continue
    }
    if (line.trim() !== "") close()
  }
  close()
  return items
}

export function parseOrderEmail(message: EmailMessage): AmazonOrder | null {
  const orderNumber = orderNumberIn(message.body)
  if (orderNumber === null) return null
  const total = GRAND_TOTAL.exec(message.body)
  return {
    messageId: message.id,
    orderNumber,
    orderDate: messageDate(message.date),
    totalCents: total === null ? null : Math.round(Number(total[1].replace(/,/g, "")) * 100),
    summary: summaryFromSubject(message.subject),
    items: itemsFromBody(message.body),
  }
}
