import { firstCapture } from "akasha/utils/narrow/first-capture/first-capture.module.code.ts"
import {
  messageDate,
  orderNumberIn,
  parseCentsIn,
} from "../amazon-order/monarch-amazon-order.module.code.ts"
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
  const totalCents = parseCentsIn(TOTAL_REFUND.exec(message.body))
  const asin = firstCapture(RETURNED_ASIN.exec(message.body))
  if (orderNumber === null || totalCents === null || asin === null) return null
  return {
    messageId: message.id,
    orderNumber,
    asin,
    refundDate: messageDate(message.date),
    totalCents,
    reason: firstCapture(RETURN_REASON.exec(message.body)),
    statedTitle: firstCapture(REFUND_TITLE.exec(message.body)) ?? "",
  }
}
