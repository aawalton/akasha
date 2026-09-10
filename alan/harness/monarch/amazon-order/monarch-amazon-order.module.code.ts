import type { EmailMessage } from "../gmail-cache/monarch-gmail-cache.module.code.ts"

const MONEY = /([\d,]+(?:\.\d+)?)\s*USD/

const ORDER_NUMBER = /\b(\d{3}-\d{7}-\d{7})\b/

const GRAND_TOTAL = /Grand Total:\s*([\d,]+(?:\.\d+)?)\s*USD/

const ITEM_NAME = /^\*\s+(.*\S)\s*$/

const QUANTITY = /^\s*Quantity:\s*(\d+)\s*$/

const BIDI = /[⁦-⁩‎‏]/g

const COMMA = /,/g

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

export function parseCentsIn(found: RegExpExecArray | null): number | null {
  const said = parseGroupIn(found)
  return said === null ? null : Math.round(Number(said.replace(COMMA, "")) * 100)
}

export function centsFromMoney(text: string): number | null {
  return parseCentsIn(MONEY.exec(text))
}

export function parseGroupIn(found: RegExpExecArray | null): string | null {
  return found?.[1] ?? null
}

export function orderNumberIn(body: string): string | null {
  return parseGroupIn(ORDER_NUMBER.exec(body))
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

function parseItemName(found: RegExpExecArray | null): string | null {
  const said = parseGroupIn(found)
  return said === null ? null : said.replace(BIDI, "").trim()
}

function parseQuantity(found: RegExpExecArray | null): number | null {
  const said = parseGroupIn(found)
  return said === null ? null : Number(said)
}

export function itemsFromBody(body: string): readonly OrderItem[] {
  const items: OrderItem[] = []
  let name: string | null = null
  let quantity = 1
  let unitCents: number | null = null
  const close = (): undefined => {
    if (name !== null) items.push({ name, quantity, unitCents })
    name = null
    quantity = 1
    unitCents = null
  }
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.replace(/\r$/, "")
    const named = parseItemName(ITEM_NAME.exec(line))
    if (named !== null) {
      close()
      name = named
      continue
    }
    if (name === null) continue
    const counted = parseQuantity(QUANTITY.exec(line))
    if (counted !== null) {
      quantity = counted
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
  const totalCents = parseCentsIn(GRAND_TOTAL.exec(message.body))
  return {
    messageId: message.id,
    orderNumber,
    orderDate: messageDate(message.date),
    totalCents,
    summary: summaryFromSubject(message.subject),
    items: itemsFromBody(message.body),
  }
}
