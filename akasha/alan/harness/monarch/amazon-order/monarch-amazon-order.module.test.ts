import { expect, test } from "bun:test"
import {
  centsFromMoney,
  itemsFromBody,
  messageDate,
  orderNumberIn,
  parseOrderEmail,
  summaryFromSubject,
} from "./monarch-amazon-order.module.code.ts"

test("money is read into cents", () => {
  expect(centsFromMoney("Grand Total: 1,234.56 USD")).toBe(123456)
  expect(centsFromMoney("9.99 USD")).toBe(999)
  expect(centsFromMoney("nothing priced here")).toBeNull()
})

test("an order number is the three-seven-seven shape Amazon writes", () => {
  expect(orderNumberIn("order 114-1234567-7654321 shipped")).toBe("114-1234567-7654321")
  expect(orderNumberIn("order 114-123-321")).toBeNull()
})

test("a date that cannot be parsed is refused rather than read as nothing", () => {
  expect(messageDate("Tue, 3 Feb 2026 09:00:00 -0700")).toBe("2026-02-03")
  expect(() => messageDate("sometime")).toThrow("is not a date")
})

test("a summary is what the subject says after its first colon", () => {
  expect(summaryFromSubject("Ordered: A Book and Other Things")).toBe("A Book and Other Things")
  expect(summaryFromSubject("No colon here")).toBe("No colon here")
})

test("the marks Amazon writes into a subject are struck before it is read", () => {
  expect(summaryFromSubject("Ordered: \u2066A Book\u2069")).toBe("A Book")
})

test("an item with no stated price is kept with no price rather than dropped", () => {
  const items = itemsFromBody(["* A Book", "  Quantity: 2", "* A Pen"].join("\n"))
  expect(items.map((one) => one.name)).toEqual(["A Book", "A Pen"])
  expect(items[0]?.quantity).toBe(2)
  expect(items[1]?.quantity).toBe(1)
  expect(items[1]?.unitCents).toBeNull()
})

test("a mail naming no order number is no order and is passed over", () => {
  expect(
    parseOrderEmail({
      id: "m1",
      subject: "Ordered: A Book",
      date: "Tue, 3 Feb 2026 09:00:00 -0700",
      body: "nothing",
    })
  ).toBeNull()
})
