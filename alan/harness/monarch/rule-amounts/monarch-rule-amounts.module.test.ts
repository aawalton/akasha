import { expect, test } from "bun:test"
import {
  amountClauseMatches,
  amountListFrom,
  checkedAmountClause,
  describeAmountClause,
} from "./monarch-rule-amounts.module.code.ts"

const clause = (is: number[], isNot: number[] = []) => ({ amountIs: is, amountIsNot: isNot })

test("a clause naming no amount matches every amount", () => {
  expect(amountClauseMatches(clause([]), 12.34)).toBe(true)
  expect(amountClauseMatches(clause([]), -900)).toBe(true)
})

test("an amount is weighed in cents, so two sums a hundredth apart are two sums", () => {
  expect(amountClauseMatches(clause([12.34]), 12.34)).toBe(true)
  expect(amountClauseMatches(clause([12.34]), 12.35)).toBe(false)
})

test("an exclusion is weighed before an inclusion", () => {
  expect(amountClauseMatches(clause([12.34], [12.34]), 12.34)).toBe(false)
  expect(amountClauseMatches(clause([], [12.34]), 12.34)).toBe(false)
  expect(amountClauseMatches(clause([], [12.34]), 12.35)).toBe(true)
})

test("a clause naming an amount of zero is refused", () => {
  expect(() => checkedAmountClause("a rule", clause([0]))).toThrow("names an amount of zero")
  expect(() => checkedAmountClause("a rule", clause([], [0]))).toThrow("excludes an amount of zero")
})

test("an amount that is not a finite number is refused by the rule's name", () => {
  expect(() => checkedAmountClause("a rule", clause([Number.NaN]))).toThrow(
    'rule "a rule" names amount'
  )
})

test("a clause that names real amounts passes", () => {
  expect(() => checkedAmountClause("a rule", clause([9.99], [1]))).not.toThrow()
})

test("one amount and a list of amounts are read alike", () => {
  expect(amountListFrom(9.99, "at")).toEqual([9.99])
  expect(amountListFrom([9.99, 1], "at")).toEqual([9.99, 1])
})

test("an amount stated as text is read as an amount", () => {
  expect(amountListFrom("9.99", "at")).toEqual([9.99])
  expect(() => amountListFrom("nine", "at")).toThrow("is not an amount")
})

test("nothing stated is no amount at all", () => {
  expect(amountListFrom(undefined, "at")).toEqual([])
  expect(amountListFrom(null, "at")).toEqual([])
  expect(amountListFrom("", "at")).toEqual([])
})

test("an inclusion is said with or and an exclusion with and", () => {
  expect(describeAmountClause(clause([1, 2], [3]))).toEqual([
    "amount = 1.00 or 2.00",
    "amount != 3.00",
  ])
  expect(describeAmountClause(clause([]))).toEqual([])
})
