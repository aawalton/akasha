
import { describe, expect, test } from "bun:test"
import { itemsFromBody, messageDate, parseOrderEmail, summaryFromSubject } from "./amazon-order.ts"
import type { AmazonOrder } from "./amazon-order.ts"
import type { AmazonRefund } from "./amazon-refund.ts"
import {
  MAX_NOTE_CHARS,
  accountsFor,
  daysAfter,
  movementOf,
  noteFor,
  noteForRefund,
  partition,
  refundAccountsFor,
  soleProduct,
} from "./amazon-match.ts"
import { mayWriteNotes } from "./notes-write.ts"

function order(over: Partial<AmazonOrder> = {}): AmazonOrder {
  return {
    messageId: "m1",
    orderNumber: "111-2222222-3333333",
    orderDate: "2026-04-13",
    totalCents: 859,
    summary: "1 item",
    items: [{ name: "Mechanical Pencil Set", quantity: 1, unitCents: 799 }],
    ...over,
  }
}

function refund(over: Partial<AmazonRefund> = {}): AmazonRefund {
  return {
    messageId: "r1",
    orderNumber: "114-4098067-2577834",
    asin: "B0DSVVWS41",
    refundDate: "2026-07-31",
    totalCents: 2148,
    reason: null,
    statedTitle: "L'VOW Women's Brown Leather...",
    ...over,
  }
}

describe("the overwrite guard", () => {
  test("an unannotated transaction is writable, however Monarch spells it", () => {
    expect(mayWriteNotes(null)).toBe(true)
    expect(mayWriteNotes(undefined)).toBe(true)
    expect(mayWriteNotes("")).toBe(true)
    expect(mayWriteNotes("   \n ")).toBe(true)
  })

  test("a note somebody typed is refused", () => {
    expect(mayWriteNotes("Paying for Mayer Brown Services")).toBe(false)
    expect(mayWriteNotes("Slippers and dresses, most returned")).toBe(false)
    expect(mayWriteNotes("Cloak returned")).toBe(false)
    expect(mayWriteNotes(noteFor(order()))).toBe(false)
    expect(mayWriteNotes(noteForRefund(refund(), "Leather Bag"))).toBe(false)
  })
})

describe("whether an order accounts for a charge", () => {
  const charge = movementOf("t1", "2026-04-13", -8.59)

  test("the amounts must agree to the cent", () => {
    expect(accountsFor(order(), charge)).toBe(true)
    expect(accountsFor(order({ totalCents: 858 }), charge)).toBe(false)
    expect(accountsFor(order({ totalCents: 860 }), charge)).toBe(false)
  })

  test("an order Amazon stated no total for matches nothing", () => {
    expect(accountsFor(order({ totalCents: null }), charge)).toBe(false)
  })

  test("the charge may fall up to ten days after the order and never before it", () => {
    expect(accountsFor(order({ orderDate: "2026-04-13" }), charge)).toBe(true)
    expect(accountsFor(order({ orderDate: "2026-04-03" }), charge)).toBe(true)
    expect(accountsFor(order({ orderDate: "2026-04-02" }), charge)).toBe(false)
    expect(accountsFor(order({ orderDate: "2026-04-14" }), charge)).toBe(false)
  })

  test("an order never accounts for a credit, whatever the amount agrees to", () => {
    expect(accountsFor(order(), movementOf("t2", "2026-04-13", 8.59))).toBe(false)
  })

  test("the gap is signed, where `dayGap` would read both directions alike", () => {
    expect(daysAfter("2026-04-03", "2026-04-13")).toBe(10)
    expect(daysAfter("2026-04-13", "2026-04-03")).toBe(-10)
  })
})

describe("whether a refund issued a credit", () => {
  const credit = movementOf("t1", "2026-07-30", 21.48)

  test("the amounts must agree to the cent", () => {
    expect(refundAccountsFor(refund(), credit)).toBe(true)
    expect(refundAccountsFor(refund({ totalCents: 2147 }), credit)).toBe(false)
    expect(refundAccountsFor(refund({ totalCents: 2149 }), credit)).toBe(false)
  })

  test("a refund never explains a charge", () => {
    expect(refundAccountsFor(refund(), movementOf("t2", "2026-07-30", -21.48))).toBe(false)
  })

  test("the window is asymmetric, the credit usually posting before the email", () => {
    expect(refundAccountsFor(refund({ refundDate: "2026-08-02" }), credit)).toBe(true)
    expect(refundAccountsFor(refund({ refundDate: "2026-08-03" }), credit)).toBe(false)
    expect(refundAccountsFor(refund({ refundDate: "2026-07-09" }), credit)).toBe(true)
    expect(refundAccountsFor(refund({ refundDate: "2026-07-08" }), credit)).toBe(false)
  })
})

describe("abstention", () => {
  const charge = movementOf("t1", "2026-06-28", -25.5)
  const first = order({ orderNumber: "114-3097629-3789060", orderDate: "2026-06-27", totalCents: 2550 })
  const second = order({ orderNumber: "114-5240407-1985853", orderDate: "2026-06-27", totalCents: 2550 })

  test("two orders on the same amount are reported rather than ranked", () => {
    const { unique, ambiguous, unmatched } = partition([charge], [first, second], accountsFor)
    expect(unique).toHaveLength(0)
    expect(unmatched).toHaveLength(0)
    expect(ambiguous).toHaveLength(1)
    expect(ambiguous[0].candidates.map((o) => o.orderNumber)).toEqual([
      "114-3097629-3789060",
      "114-5240407-1985853",
    ])
  })

  test("no tie-break is smuggled in as an ordering", () => {
    const reversed = partition([charge], [second, first], accountsFor)
    expect(reversed.unique).toHaveLength(0)
    expect(reversed.ambiguous).toHaveLength(1)
  })

  test("an order is not consumed by the first charge that matches it", () => {
    const other = movementOf("t2", "2026-06-28", -25.5)
    const { unique, ambiguous } = partition([charge, other], [first, second], accountsFor)
    expect(unique).toHaveLength(0)
    expect(ambiguous).toHaveLength(2)
  })

  test("one order alone is a match, and no order at all is neither", () => {
    expect(partition([charge], [first], accountsFor).unique).toHaveLength(1)
    expect(partition([charge], [], accountsFor).unmatched).toHaveLength(1)
  })

  test("the same rule abstains on the refund side, which is why there is one of it", () => {
    const credit = movementOf("c1", "2026-06-25", 23.63)
    const a = refund({ orderNumber: "112-6010972-3335437", asin: "B0BP292936", refundDate: "2026-06-26", totalCents: 2363 })
    const b = refund({ orderNumber: "112-6010972-3335437", asin: "B0FHB52PFC", refundDate: "2026-06-26", totalCents: 2363 })
    const { unique, ambiguous } = partition([credit], [a, b], refundAccountsFor)
    expect(unique).toHaveLength(0)
    expect(ambiguous[0].candidates.map((r) => r.asin)).toEqual(["B0BP292936", "B0FHB52PFC"])
  })
})

describe("the product an order settles", () => {
  test("an order naming one item settles it", () => {
    expect(soleProduct([order()], "111-2222222-3333333")).toBe("Mechanical Pencil Set")
  })

  test("an order naming several settles nothing", () => {
    const many = order({
      items: [
        { name: "Car Seat Towel Cover", quantity: 1, unitCents: 2519 },
        { name: "Waterproof Seat Cover", quantity: 1, unitCents: 2199 },
      ],
    })
    expect(soleProduct([many], "111-2222222-3333333")).toBeNull()
  })

  test("an order nobody has an email for settles nothing", () => {
    expect(soleProduct([order()], "999-9999999-9999999")).toBeNull()
  })

  test("the same title on two lines is still one product", () => {
    const split = order({
      items: [
        { name: "Swim Tank", quantity: 1, unitCents: 1999 },
        { name: "Swim Tank", quantity: 1, unitCents: 1999 },
      ],
    })
    expect(soleProduct([split], "111-2222222-3333333")).toBe("Swim Tank")
  })
})

describe("the note", () => {
  test("names the product and the order", () => {
    expect(noteFor(order())).toBe("Mechanical Pencil Set — Amazon order 111-2222222-3333333")
  })

  test("counts only where more than one was bought", () => {
    const two = order({ items: [{ name: "Sketchbook", quantity: 2, unitCents: 3797 }] })
    expect(noteFor(two)).toContain("Sketchbook (x 2)")
  })

  test("joins several products", () => {
    const many = order({
      items: [
        { name: "Food Jar", quantity: 1, unitCents: 1995 },
        { name: "Spoon", quantity: 3, unitCents: 199 },
      ],
    })
    expect(noteFor(many)).toBe("Food Jar; Spoon (x 3) — Amazon order 111-2222222-3333333")
  })

  test("falls back to the subject where Amazon sent no product name", () => {
    const bare = order({ items: [], summary: "2 Kitchen items" })
    expect(noteFor(bare)).toBe("2 Kitchen items — Amazon order 111-2222222-3333333")
  })

  test("is bounded, and keeps the order number when it truncates", () => {
    const huge = order({ items: [{ name: "x".repeat(4000), quantity: 1, unitCents: 1 }] })
    const note = noteFor(huge)
    expect(note.length).toBeLessThanOrEqual(MAX_NOTE_CHARS)
    expect(note).toContain("Amazon order 111-2222222-3333333")
  })
})

describe("the refund note", () => {
  test("says it was a refund, names the product and ends in the order", () => {
    expect(noteForRefund(refund(), "THERMOS FUNTAINER Kids Food Jar")).toBe(
      "Refund — THERMOS FUNTAINER Kids Food Jar — Amazon order 114-4098067-2577834"
    )
  })

  test("carries the reason where Amazon stated one", () => {
    expect(noteForRefund(refund({ reason: "No longer needed" }), "Leather Bag")).toBe(
      "Refund — Leather Bag — returned: No longer needed — Amazon order 114-4098067-2577834"
    )
  })

  test("never carries the truncation marker the refund email uses", () => {
    expect(noteForRefund(refund(), "Arshiner Girls Cute Nightgown Short Sleeve")).not.toContain("...")
  })

  test("is bounded, and a long title costs neither the reason nor the order", () => {
    const note = noteForRefund(refund({ reason: "Too small/short" }), "x".repeat(4000))
    expect(note.length).toBeLessThanOrEqual(MAX_NOTE_CHARS)
    expect(note).toContain("returned: Too small/short")
    expect(note.endsWith("Amazon order 114-4098067-2577834")).toBe(true)
  })
})

describe("reading one order confirmation", () => {
  const body = [
    "Order #",
    "114-9625734-0950624",
    "",
    "* Four Candies Cute Mechanical Pencil Set",
    "  Quantity: 2",
    "  7.99 USD",
    "",
    "* SYLVANIA 7440 Long Life Miniature Bulb",
    "  7.4 USD",
    "",
    "Grand Total:",
    "23.38 USD",
    "",
    "©2026 Amazon.com, Inc. 410 Terry Avenue N., Seattle, WA 98109.",
  ].join("\r\n")

  test("the order number, the total and the items", () => {
    const parsed = parseOrderEmail({
      id: "m1",
      subject: 'Ordered: "Four Candies Cute..."',
      date: "Mon, 13 Apr 2026 18:01:38 +0000",
      body,
    })
    expect(parsed).not.toBeNull()
    expect(parsed?.orderNumber).toBe("114-9625734-0950624")
    expect(parsed?.totalCents).toBe(2338)
    expect(parsed?.orderDate).toBe("2026-04-13")
    expect(parsed?.items).toEqual([
      { name: "Four Candies Cute Mechanical Pencil Set", quantity: 2, unitCents: 799 },
      { name: "SYLVANIA 7440 Long Life Miniature Bulb", quantity: 1, unitCents: 740 },
    ])
  })

  test("a trimmed trailing zero is still an amount", () => {
    const trimmed = body.replace("23.38 USD", "7.8 USD")
    expect(parseOrderEmail({ id: "m", subject: "Ordered: 1 item", date: "Mon, 13 Apr 2026 18:01:38 +0000", body: trimmed })?.totalCents).toBe(780)
  })

  test("an order Amazon stated no total for reads as none rather than as zero", () => {
    const noTotal = body.replace("Grand Total:\r\n23.38 USD", "")
    expect(parseOrderEmail({ id: "m", subject: "Ordered: 1 item", date: "Mon, 13 Apr 2026 18:01:38 +0000", body: noTotal })?.totalCents).toBeNull()
  })

  test("the footer's own numbers are not items", () => {
    expect(itemsFromBody(body)).toHaveLength(2)
  })

  test("a message carrying no order number is null rather than a throw", () => {
    expect(parseOrderEmail({ id: "m", subject: "Ordered", date: "Mon, 13 Apr 2026 18:01:38 +0000", body: "nothing here" })).toBeNull()
  })

  test("the subject's invisible isolates do not ride into a note", () => {
    expect(summaryFromSubject("Ordered: ⁦2⁩ Kitchen items")).toBe("2 Kitchen items")
    expect(summaryFromSubject("Ordered: ⁦1⁩ item")).toBe("1 item")
  })

  test("the date is read in UTC", () => {
    expect(messageDate("Sun, 26 Jul 2026 02:16:18 +0000")).toBe("2026-07-26")
    expect(() => messageDate("not a date")).toThrow()
  })
})
