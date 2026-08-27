
import { describe, expect, test } from "bun:test"
import { divergentPairs } from "./amazon-pairs.ts"
import type { PairRow } from "./amazon-pairs.ts"

describe("the category divergence across a pair", () => {
  function row(over: Partial<PairRow> = {}): PairRow {
    return {
      monarchId: "t1",
      date: "2026-06-24",
      amountCents: -2148,
      category: "Shopping",
      orderNumber: "112-8579462-5019445",
      ...over,
    }
  }

  test("a charge and its refund disagreeing is named", () => {
    const found = divergentPairs([
      row(),
      row({ monarchId: "t2", amountCents: 2148, category: "Returns", date: "2026-06-25" }),
    ])
    expect(found).toHaveLength(1)
    expect(found[0].orderNumber).toBe("112-8579462-5019445")
    expect(found[0].categories).toEqual(["Shopping", "Returns"])
    expect(found[0].debits.map((r) => r.monarchId)).toEqual(["t1"])
    expect(found[0].credits.map((r) => r.monarchId)).toEqual(["t2"])
  })

  test("a charge and its refund agreeing is not", () => {
    expect(divergentPairs([row(), row({ monarchId: "t2", amountCents: 2148 })])).toHaveLength(0)
  })

  test("an uncategorized side is a disagreement rather than a hole to skip", () => {
    const found = divergentPairs([row(), row({ monarchId: "t2", amountCents: 2148, category: null })])
    expect(found).toHaveLength(1)
    expect(found[0].categories).toEqual(["Shopping", null])
  })

  test("charges alone are not a pair, however they disagree", () => {
    expect(
      divergentPairs([row(), row({ monarchId: "t2", category: "Household" })])
    ).toHaveLength(0)
  })

  test("refunds alone are not a pair either", () => {
    expect(
      divergentPairs([
        row({ amountCents: 2148 }),
        row({ monarchId: "t2", amountCents: 1611, category: "Household" }),
      ])
    ).toHaveLength(0)
  })

  test("orders are held apart", () => {
    const found = divergentPairs([
      row(),
      row({ monarchId: "t2", amountCents: 2148, category: "Returns" }),
      row({ monarchId: "t3", orderNumber: "114-0000000-0000000" }),
      row({ monarchId: "t4", orderNumber: "114-0000000-0000000", amountCents: 2148 }),
    ])
    expect(found.map((d) => d.orderNumber)).toEqual(["112-8579462-5019445"])
  })
})
