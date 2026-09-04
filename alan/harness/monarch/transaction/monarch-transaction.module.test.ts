import { expect, test } from "bun:test"
import {
  accountKey,
  answered,
  cents,
  DESCRIPTION_JOIN,
  dayGap,
  descriptionOf,
  TRUSTED_MONTHS,
  trustedFrom,
  UNATTENDED_DAYS,
  UNCATEGORIZED,
  unattendedFrom,
} from "./monarch-transaction.module.code.ts"

test("a description is the merchant and the statement line joined, in that order", () => {
  expect(descriptionOf({ merchant: "Costco", statement: "COSTCO WHSE #0392" })).toBe(
    `Costco${DESCRIPTION_JOIN}COSTCO WHSE #0392`
  )
})

test("an amount is compared in cents, so two sums a hundredth apart are two sums", () => {
  expect(cents(12.34)).toBe(1234)
  expect(cents(12.35)).not.toBe(cents(12.34))
  expect(cents(-0.1)).toBe(-10)
})

test("a day gap is whole days, and is the same either way round", () => {
  expect(dayGap("2026-01-01", "2026-01-08")).toBe(7)
  expect(dayGap("2026-01-08", "2026-01-01")).toBe(7)
  expect(dayGap("2026-01-01", "2026-01-01")).toBe(0)
})

test("a day gap is measured from the day rather than from the time of day", () => {
  expect(dayGap("2026-01-01T23:59:00Z", "2026-01-02T00:01:00Z")).toBe(1)
})

test("a date that cannot be parsed is refused rather than measured as nothing", () => {
  expect(() => dayGap("not a day", "2026-01-01")).toThrow("is not a date")
})

test("an account is known by the last four digits its title ends in", () => {
  expect(accountKey("Checking (...7151)")).toBe("7151")
  expect(accountKey("Costco Anywhere Visa Card by Citi (...1425)")).toBe("1425")
})

test("an account whose title names no digits is known by its lowered title", () => {
  expect(accountKey("  Cash Plus  ")).toBe("cash plus")
})

test("a category of Uncategorized is no answer", () => {
  expect(answered(UNCATEGORIZED)).toBe(false)
  expect(answered("")).toBe(false)
  expect(answered("Groceries")).toBe(true)
})

test("a window is cut from the moment handed in rather than from the clock", () => {
  const at = new Date("2026-09-03T00:00:00.000Z")
  expect(trustedFrom(at)).toBe("2025-09-03")
  expect(unattendedFrom(at)).toBe("2026-08-27")
})

test("the trusted window is twelve months and the unattended window is seven days", () => {
  expect(TRUSTED_MONTHS).toBe(12)
  expect(UNATTENDED_DAYS).toBe(7)
})
