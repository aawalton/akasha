import { messageDate, orderNumberIn } from "../amazon-order/monarch-amazon-order.module.code.ts"
import type { EmailMessage } from "../gmail-cache/monarch-gmail-cache.module.code.ts"

const TOTAL_REFUND = /Total refund\*?\s*\$([\d,]+(?:\.\d+)?)/

const RETURNED_ASIN = /\/gp\/product\/([A-Z0-9]{10})\?ref_=E_RefundConfirmation_Asin/

const RETURN_REASON = /Reason for return:\s*(.+?)\s*$/m

const REFUND_TITLE = /^\[(.+?)\]\(https:\/\/www\.amazon\.com\/gp\/product\//m

export interface AmazonRefund {
  readonly messageId: string
  readonly orderNumber: string
  readonly asin: string
  readonly refundDate: string
  readonly totalCents: number
  readonly reason: string | null
  readonly statedTitle: string
}

export function parseRefundEmail(message: EmailMessage): AmazonRefund | null {
  const orderNumber = orderNumberIn(message.body)
  const total = TOTAL_REFUND.exec(message.body)
  const asin = RETURNED_ASIN.exec(message.body)
  if (orderNumber === null || total === null || asin === null) return null
  const reason = RETURN_REASON.exec(message.body)
  const title = REFUND_TITLE.exec(message.body)
  return {
    messageId: message.id,
    orderNumber,
    asin: asin[1],
    refundDate: messageDate(message.date),
    totalCents: Math.round(Number(total[1].replace(/,/g, "")) * 100),
    reason: reason === null ? null : reason[1],
    statedTitle: title === null ? "" : title[1],
  }
}
