import { expect, test } from "bun:test"
import {
  checkedDateClauses,
  dateClausesMatch,
  dateFloorFrom,
  describeDateClauses,
  monthListFrom,
  monthNumberFrom,
} from "./monarch-rule-dates.module.code.ts"

const clauses = (over: Partial<Parameters<typeof dateClausesMatch>[0]> = {}) => ({
  onOrAfter: null,
  before: null,
  monthIs: [],
  monthIsNot: [],
  ...over,
})

test("a floor holds on its own day and a ceiling does not", () => {
  const at = clauses({ onOrAfter: "2026-01-01", before: "2026-02-01" })
  expect(dateClausesMatch(at, "2026-01-01")).toBe(true)
  expect(dateClausesMatch(at, "2026-01-31")).toBe(true)
  expect(dateClausesMatch(at, "2026-02-01")).toBe(false)
  expect(dateClausesMatch(at, "2025-12-31")).toBe(false)
})

test("a clause naming no month matches every month", () => {
  expect(dateClausesMatch(clauses(), "2026-07-04")).toBe(true)
})

test("an excluded month is weighed before an included one", () => {
  expect(dateClausesMatch(clauses({ monthIs: [7], monthIsNot: [7] }), "2026-07-04")).toBe(false)
  expect(dateClausesMatch(clauses({ monthIs: [7] }), "2026-07-04")).toBe(true)
  expect(dateClausesMatch(clauses({ monthIs: [7] }), "2026-08-04")).toBe(false)
})

test("a floor at or after its ceiling is refused", () => {
  expect(() =>
    checkedDateClauses("a rule", clauses({ onOrAfter: "2026-02-01", before: "2026-02-01" }))
  ).toThrow("so no day satisfies both")
})

test("a date that is not YYYY-MM-DD is refused by the rule's name", () => {
  expect(() => checkedDateClauses("a rule", clauses({ onOrAfter: "March" }))).toThrow(
    'rule "a rule" floors at "March"'
  )
})

test("a month outside one to twelve is refused", () => {
  expect(() => checkedDateClauses("a rule", clauses({ monthIs: [13] }))).toThrow(
    "a calendar month is 1 to 12"
  )
  expect(() => checkedDateClauses("a rule", clauses({ monthIs: [1, 12] }))).not.toThrow()
})

test("an empty date clause is no clause rather than a floor of nothing", () => {
  expect(dateFloorFrom("", "at")).toBeNull()
  expect(dateFloorFrom(null, "at")).toBeNull()
  expect(dateFloorFrom("2026-01-01", "at")).toBe("2026-01-01")
})

test("a rule states a month in words and it is kept as a number", () => {
  expect(monthNumberFrom("January", "at")).toBe(1)
  expect(monthNumberFrom("  december ", "at")).toBe(12)
  expect(() => monthNumberFrom("Smarch", "at")).toThrow('"Smarch" is not a month')
})

test("one month and a list of months are read alike", () => {
  expect(monthListFrom(7, "at")).toEqual([7])
  expect(monthListFrom(["7", 8], "at")).toEqual([7, 8])
  expect(monthListFrom(undefined, "at")).toEqual([])
})

test("a clause is said back naming the months in words", () => {
  expect(describeDateClauses(clauses({ onOrAfter: "2026-01-01", monthIs: [7, 8] }))).toEqual([
    "date >= 2026-01-01",
    "month = July or August",
  ])
})
