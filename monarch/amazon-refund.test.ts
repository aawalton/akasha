
import { describe, expect, test } from "bun:test"
import { parseRefundEmail } from "./amazon-refund.ts"

describe("reading one refund notice", () => {
  const body = [
    "Hello Alan, Your refund was issued. $21.48 will be credited to your AmazonPLCC by Aug 6.",
    "View refund summary (https://www.amazon.com/spr/returns/prep?orderId=114-4098067-2577834&ref_=E_PREPRefundConfirmation)",
    "",
    "Refund subtotal  $21.48",
    "Total refund*  $21.48",
    "",
    "Item(s) in your return request",
    " (https://www.amazon.com/gp/product/B0DSVVWS41?ref_=E_RefundConfirmation_Asin_Img)",
    "[L'VOW Women's Brown Leather...](https://www.amazon.com/gp/product/B0DSVVWS41?ref_=E_RefundConfirmation_Asin_Title)",
    "Quantity: 1 Order # 114-4098067-2577834 Reason for return: No longer needed",
    "",
    "Products related to your return",
    "Pirekul Viking Costume Women Belt with Troll Cross",
    " -7% $13.99 Typical price: $14.99",
    "https://www.amazon.com/gp/product/B0FMDZW743/?ref_=snr_refund_conf_email_2p_0_lm",
  ].join("\n")

  const message = { id: "r1", subject: "Advance refund issued for L'VOW Women's Brown....", date: "Fri, 31 Jul 2026 06:40:31 +0000", body }

  test("the amount, the order number and the ASIN", () => {
    const parsed = parseRefundEmail(message)
    expect(parsed).not.toBeNull()
    expect(parsed?.totalCents).toBe(2148)
    expect(parsed?.orderNumber).toBe("114-4098067-2577834")
    expect(parsed?.refundDate).toBe("2026-07-31")
    expect(parsed?.reason).toBe("No longer needed")
  })

  test("the ASIN is the returned item's and never the advertisement's", () => {
    expect(parseRefundEmail(message)?.asin).toBe("B0DSVVWS41")
    const reordered = { ...message, body: body.split("\n").reverse().join("\n") }
    expect(parseRefundEmail(reordered)?.asin).toBe("B0DSVVWS41")
  })

  test("a trimmed trailing zero is still an amount", () => {
    const trimmed = { ...message, body: body.replace("Total refund*  $21.48", "Total refund*  $7.8") }
    expect(parseRefundEmail(trimmed)?.totalCents).toBe(780)
  })

  test("an email stating no reason reads as none rather than as empty", () => {
    const silent = { ...message, body: body.replace(" Reason for return: No longer needed", "") }
    expect(parseRefundEmail(silent)?.reason).toBeNull()
  })

  test("the stated title is carried as evidence, truncation and all", () => {
    expect(parseRefundEmail(message)?.statedTitle).toBe("L'VOW Women's Brown Leather...")
  })

  test("an email missing any of the three is null rather than half-read", () => {
    for (const gone of ["Total refund*  $21.48", "114-4098067-2577834", "B0DSVVWS41"]) {
      const cut = { ...message, body: body.split(gone).join("") }
      expect(parseRefundEmail(cut)).toBeNull()
    }
  })
})
