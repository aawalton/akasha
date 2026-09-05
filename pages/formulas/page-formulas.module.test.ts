import { describe, expect, test } from "bun:test"
import { type Declared, workedInto, workingOver } from "./page-formulas.module.code.ts"

const AT = Date.UTC(2026, 7, 20, 12, 0, 0)

function stored(slug: string, sort: string, many = false): Declared {
  return {
    slug,
    key: slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase()),
    sort,
    many,
    formula: null,
    holds: null,
  }
}

function figure(slug: string, formula: string, holds: string): Declared {
  return {
    slug,
    key: slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase()),
    sort: "formula-property",
    many: false,
    formula,
    holds,
  }
}

const DAY: readonly Declared[] = [
  stored("faith-points", "number-property"),
  stored("love-points", "number-property"),
  stored("safety-level", "text-property"),
  stored("persona-days", "text-property", true),
  stored("sessions", "page-property-entry"),
  figure("faith-level", "case({faith-points} >= 1 -> 3, otherwise -> 0)", "number"),
  figure("love-level", "case({love-points} >= 1 -> 3, otherwise -> 0)", "number"),
  figure("faith-stoplight", 'case({faith-level} == 3 -> "🟢", otherwise -> "⚫")', "text"),
  figure("stoplights", '"{faith-stoplight}"', "text"),
  figure("total-level", "{faith-level} + {love-level}", "number"),
]

function working(declared: readonly Declared[]) {
  const one = workingOver("wake-day", declared)
  if (one === null) throw new Error("nothing was worked over")
  return one
}

describe("the figures a page type works out", () => {
  test("a page type declaring no formula is built for at all", () => {
    expect(workingOver("wake-day", [stored("faith-points", "number-property")])).toBeNull()
  })

  test("every figure is worked out, each after the figures it reads", () => {
    const one = working(DAY)
    if ("barred" in one) throw new Error(one.barred)
    expect(one.figures.map((each) => each.slug)).toEqual([
      "faith-level",
      "love-level",
      "faith-stoplight",
      "stoplights",
      "total-level",
    ])
    const filled = workedInto(one, { faithPoints: 2, lovePoints: 0 }, AT)
    expect(filled["faithLevel"]).toBe(3)
    expect(filled["loveLevel"]).toBe(0)
    expect(filled["faithStoplight"]).toBe("🟢")
    expect(filled["stoplights"]).toBe("🟢")
    expect(filled["totalLevel"]).toBe(3)
  })

  test("a figure reading a key no page carries is refused", () => {
    const one = working([...DAY, figure("made-up", "{no-such-key-at-all} + 1", "number")])
    if (!("barred" in one)) throw new Error("nothing was barred")
    expect(one.barred).toBe("checking — no property is declared under the key `no-such-key-at-all`")
    expect(one.keys).toEqual(["madeUp"])
  })

  test("renaming one stored key darkens every figure reaching that key and no other", () => {
    const renamed = DAY.map((one) =>
      one.slug === "faith-points" ? stored("faith-points-renamed", "number-property") : one
    )
    const one = working(renamed)
    if (!("barred" in one)) throw new Error("nothing was barred")
    expect(one.keys).toEqual(["faithLevel", "faithStoplight", "stoplights", "totalLevel"])
    expect(one.keys).not.toContain("loveLevel")
  })

  test("a figure answering another kind than the property states is refused", () => {
    const one = working([...DAY, figure("mis-stated", "{faith-points} + 1", "text")])
    if (!("barred" in one)) throw new Error("nothing was barred")
    expect(one.barred).toContain("is declared a text, and its formula answers a number")
  })

  test("a sort with no kind written down bars every figure", () => {
    const one = working([...DAY, stored("odd-one", "no-such-property")])
    if (!("barred" in one)) throw new Error("nothing was barred")
    expect(one.barred).toContain("no kind is written down for `no-such-property`")
    expect([...one.keys].sort()).toEqual([
      "faithLevel",
      "faithStoplight",
      "loveLevel",
      "stoplights",
      "totalLevel",
    ])
  })

  test("a formula property whose page states no formula bars every figure", () => {
    const missing: Declared = {
      slug: "gone",
      key: "gone",
      sort: "formula-property",
      many: false,
      formula: null,
      holds: "number",
    }
    const one = working([...DAY, missing])
    if (!("barred" in one)) throw new Error("nothing was barred")
    expect(one.barred).toContain("no page states the formula")
  })

  test("a figure answering absent puts no key on the page", () => {
    const one = working([...DAY, figure("doubled", "{faith-points} * 2", "number")])
    if ("barred" in one) throw new Error(one.barred)
    const filled = workedInto(one, {}, AT)
    expect("doubled" in filled).toBe(false)
    expect(filled["faithLevel"]).toBe(0)
    const carried = workedInto(one, { faithPoints: 4 }, AT)
    expect(carried["doubled"]).toBe(8)
  })

  test("a cycle among the figures is refused", () => {
    const ring = [
      stored("faith-points", "number-property"),
      figure("one-way", "{other-way} + 1", "number"),
      figure("other-way", "{one-way} + 1", "number"),
    ]
    const one = working(ring)
    if (!("barred" in one)) throw new Error("nothing was barred")
    expect(one.barred).toContain("a cycle among the formulas")
  })

  test("a formula reads a computed property as a formula reads a stored one", () => {
    const worked: Declared = {
      slug: "strength-calories",
      key: "strengthCalories",
      sort: "computed-property",
      many: false,
      formula: null,
      holds: "number",
    }
    const one = working([
      ...DAY,
      worked,
      figure("activity-calories", "({faith-points} ?? 0) + ({strength-calories} ?? 0)", "number"),
    ])
    if ("barred" in one) throw new Error(one.barred)
    expect(one.reads.map((each) => each.slug)).toContain("strength-calories")
    const filled = workedInto(one, { faithPoints: 2, strengthCalories: 100 }, AT)
    expect(filled["activityCalories"]).toBe(102)
  })

  test("a computed property stating no kind bars every figure", () => {
    const odd: Declared = {
      slug: "odd-one",
      key: "oddOne",
      sort: "computed-property",
      many: false,
      formula: null,
      holds: null,
    }
    const one = working([...DAY, odd])
    if (!("barred" in one)) throw new Error("nothing was barred")
    expect(one.barred).toContain("states no kind its calculation answers")
    expect([...one.keys].sort()).toEqual([
      "faithLevel",
      "faithStoplight",
      "loveLevel",
      "stoplights",
      "totalLevel",
    ])
  })

  test("an entry property and a formula property are left out of what a formula reads", () => {
    const one = working(DAY)
    if ("barred" in one) throw new Error(one.barred)
    expect(one.reads.map((each) => each.slug)).toEqual([
      "faith-points",
      "love-points",
      "safety-level",
      "persona-days",
    ])
    expect(one.reads.find((each) => each.slug === "persona-days")?.type).toEqual({
      kind: "list",
      of: "text",
    })
  })
})
