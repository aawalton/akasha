
import { describe, expect, test } from "bun:test"
import { merged } from "./land-files.ts"
import type { TransactionLine } from "./files.ts"

function line(held: Partial<TransactionLine> & { "monarch-id": string }): TransactionLine {
  return { date: "2026-08-01", amount: -1, ...held } as TransactionLine
}

describe("what a landing carries forward from the line already standing", () => {
  test("marks a category Monarch brought as Monarch's", () => {
    const { lines } = merged([], [line({ "monarch-id": "a", "category-slug": "shopping" })], new Set())
    expect(lines[0]?.["category-source"]).toBe("monarch")
  })

  test("takes Monarch's new category where the one standing was Monarch's too", () => {
    const standing = [
      line({ "monarch-id": "a", "category-slug": "shopping", "category-source": "monarch" }),
    ]
    const { lines, held } = merged(
      standing,
      [line({ "monarch-id": "a", "category-slug": "groceries" })],
      new Set()
    )
    expect(lines[0]?.["category-slug"]).toBe("groceries")
    expect(held).toEqual([])
  })

  test("holds a decision of ours against a different one from Monarch", () => {
    const standing = [
      line({
        "monarch-id": "a",
        "category-slug": "audible",
        "category-source": "manual-categorization",
        "category-decided-by": "Alan",
      }),
    ]
    const { lines, held } = merged(
      standing,
      [line({ "monarch-id": "a", "category-slug": "shopping" })],
      new Set()
    )
    expect(lines[0]?.["category-slug"]).toBe("audible")
    expect(lines[0]?.["category-source"]).toBe("manual-categorization")
    expect(lines[0]?.["category-decided-by"]).toBe("Alan")
    expect(held).toEqual(["a (manual-categorization)"])
  })

  test("keeps our provenance where Monarch names the same category", () => {
    const standing = [
      line({
        "monarch-id": "a",
        "category-slug": "audible",
        "category-source": "programmatic-categorization",
        "category-decided-by": "audible-subscription",
      }),
    ]
    const { lines } = merged(
      standing,
      [line({ "monarch-id": "a", "category-slug": "audible" })],
      new Set()
    )
    expect(lines[0]?.["category-source"]).toBe("programmatic-categorization")
    expect(lines[0]?.["category-decided-by"]).toBe("audible-subscription")
  })

  test("carries an Amazon order number Monarch knows nothing about", () => {
    const standing = [line({ "monarch-id": "a", "amazon-order-number": "111-222" })]
    const { lines } = merged(standing, [line({ "monarch-id": "a" })], new Set())
    expect(lines[0]?.["amazon-order-number"]).toBe("111-222")
  })

  test("drops a line that vanished, whatever it carried", () => {
    const standing = [line({ "monarch-id": "a" }), line({ "monarch-id": "b" })]
    const { lines } = merged(standing, [], new Set(["a"]))
    expect(lines.map((one) => one["monarch-id"])).toEqual(["b"])
  })

  test("keeps the id the line already carried, rather than the arriving one", () => {
    const standing = [line({ "monarch-id": "a", id: "01a02990-99d4-7000-b412-fce6111a5b61" })]
    const { lines } = merged(
      standing,
      [line({ "monarch-id": "a", id: "019ffc7b-4548-7003-bb59-10d047bdc78c", notes: "changed" })],
      new Set()
    )
    expect(lines[0]?.id).toBe("01a02990-99d4-7000-b412-fce6111a5b61")
    expect(lines[0]?.notes).toBe("changed")
  })

  test("sorts by date then by monarch id", () => {
    const { lines } = merged(
      [],
      [
        line({ "monarch-id": "b", date: "2026-08-02" }),
        line({ "monarch-id": "c", date: "2026-08-01" }),
        line({ "monarch-id": "a", date: "2026-08-01" }),
      ],
      new Set()
    )
    expect(lines.map((one) => one["monarch-id"])).toEqual(["a", "c", "b"])
  })
})
