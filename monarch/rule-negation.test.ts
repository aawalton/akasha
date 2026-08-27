import { describe, expect, test } from "bun:test"
import { checkedAmountClause } from "./rule-amounts.ts"
import { checkedDateClauses } from "./rule-dates.ts"
import { clausesMatch } from "./rules.ts"
import type { Rule } from "./rules.ts"
import type { Subject } from "./transaction.ts"

const BARE: Rule = {
  name: "a rule",
  merchantIs: [],
  merchantContains: [],
  statementContains: [],
  descriptionContains: [],
  accountIs: [],
  accountIsNot: [],
  amountSign: null,
  amountSignIsNot: null,
  amountIs: [],
  amountIsNot: [],
  counterpart: null,
  onOrAfter: null,
  before: null,
  monthIs: [],
  monthIsNot: [],
  note: null,
  outcome: { kind: "reserve" },
}

const rule = (over: Partial<Rule>): Rule => ({ ...BARE, ...over })

const row = (over: Partial<Subject> = {}): Subject => ({
  monarchId: "t1",
  merchant: "netflix",
  statement: "",
  account: "Checking (...7151)",
  amount: -9.99,
  date: "2026-04-13",
  ...over,
})

describe("a sign that is not the one named", () => {
  test("admits the amounts the positive spelling admits", () => {
    expect(clausesMatch(rule({ amountSignIsNot: "negative" }), row({ amount: 5 }))).toBe(true)
    expect(clausesMatch(rule({ amountSignIsNot: "negative" }), row({ amount: -5 }))).toBe(false)
    expect(clausesMatch(rule({ amountSignIsNot: "positive" }), row({ amount: -5 }))).toBe(true)
    expect(clausesMatch(rule({ amountSignIsNot: "positive" }), row({ amount: 5 }))).toBe(false)
  })

  test("admits zero, which neither positive nor negative does", () => {
    expect(clausesMatch(rule({ amountSign: "positive" }), row({ amount: 0 }))).toBe(false)
    expect(clausesMatch(rule({ amountSign: "negative" }), row({ amount: 0 }))).toBe(false)
    expect(clausesMatch(rule({ amountSignIsNot: "negative" }), row({ amount: 0 }))).toBe(true)
    expect(clausesMatch(rule({ amountSignIsNot: "positive" }), row({ amount: 0 }))).toBe(true)
  })
})

describe("an account that is not the one named", () => {
  test("excludes it and admits every other, matched on the last four", () => {
    const one = rule({ accountIsNot: ["7151"] })
    expect(clausesMatch(one, row({ account: "Checking (...7151)" }))).toBe(false)
    expect(clausesMatch(one, row({ account: "Checking (...2749)" }))).toBe(true)
  })
})

describe("an amount that is not the one named", () => {
  test("excludes it and admits every other", () => {
    const one = rule({ amountIsNot: [-106.36] })
    expect(clausesMatch(one, row({ amount: -106.36 }))).toBe(false)
    expect(clausesMatch(one, row({ amount: -106.37 }))).toBe(true)
  })
})

describe("a date before the day named", () => {
  test("takes the days under it and not the day itself", () => {
    const one = rule({ before: "2026-08-08" })
    expect(clausesMatch(one, row({ date: "2026-08-07" }))).toBe(true)
    expect(clausesMatch(one, row({ date: "2026-08-08" }))).toBe(false)
    expect(clausesMatch(one, row({ date: "2026-08-09" }))).toBe(false)
  })

  test("is the exact complement of on-or-after over the same day", () => {
    for (const date of ["2026-08-07", "2026-08-08", "2026-08-09"]) {
      const floor = clausesMatch(rule({ onOrAfter: "2026-08-08" }), row({ date }))
      const ceiling = clausesMatch(rule({ before: "2026-08-08" }), row({ date }))
      expect(floor).toBe(!ceiling)
    }
  })
})

describe("a month that is not one of those named", () => {
  test("excludes them and admits the rest", () => {
    const one = rule({ monthIsNot: [7, 9] })
    expect(clausesMatch(one, row({ date: "2026-07-04" }))).toBe(false)
    expect(clausesMatch(one, row({ date: "2026-09-04" }))).toBe(false)
    expect(clausesMatch(one, row({ date: "2026-08-04" }))).toBe(true)
  })
})

describe("clauses that no transaction could satisfy", () => {
  test("are refused rather than left to match nothing", () => {
    expect(() =>
      checkedDateClauses("a rule", { onOrAfter: "2026-08-08", before: "2026-08-08", monthIs: [], monthIsNot: [] })
    ).toThrow()
    expect(() => checkedAmountClause("a rule", { amountIs: [], amountIsNot: [0] })).toThrow()
  })
})
