import { describe, expect, test } from "bun:test"
import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { KIND_OF, workingOver } from "@akasha/pages-system/page-formulas"
import { wakeDay } from "../wake-days/wake-day.page-type.ts"
import { declaredFrom, figuresIn, type Stated } from "./day-figures.module.code.ts"

const PROPERTIES_AT = join(dirname(import.meta.dir), "wake-days", "properties")

const ENDING = ".ts"

async function propertiesDeclared(): Promise<readonly Stated[]> {
  const named = readdirSync(PROPERTIES_AT)
    .filter((one) => one.endsWith(ENDING))
    .sort()
  const stated: Stated[] = []
  for (const one of named) {
    const held = (await import(join(PROPERTIES_AT, one))) as Readonly<Record<string, unknown>>
    for (const value of Object.values(held)) {
      const declared = value as {
        slug?: unknown
        propertySlug?: unknown
        formula?: unknown
        holds?: unknown
      }
      if (typeof declared.slug !== "string") continue
      stated.push({
        slug: declared.slug,
        propertySlug: typeof declared.propertySlug === "string" ? declared.propertySlug : undefined,
        formula: typeof declared.formula === "string" ? declared.formula : undefined,
        holds: typeof declared.holds === "string" ? declared.holds : undefined,
      })
    }
  }
  return stated
}

const FIGURES = wakeDay.partSlugs.filter((one) => one.startsWith("formula-property/")).length

describe("the figures a wake day works out", () => {
  test("the page type declares figures at all", async () => {
    const stated = await propertiesDeclared()
    expect(stated.filter((one) => one.formula !== undefined).length).toBeGreaterThanOrEqual(16)
    expect(FIGURES).toBeGreaterThanOrEqual(16)
  })

  test("every figure reads only keys the wake day declares", async () => {
    const judged = figuresIn(wakeDay, await propertiesDeclared())
    if ("barred" in judged) throw new Error(judged.barred)
    expect(judged.figures.length).toBe(FIGURES)
  })

  test("every figure states the kind that figure answers", async () => {
    const stated = await propertiesDeclared()
    const said = stated.filter((one) => one.formula !== undefined)
    expect(said.filter((one) => one.holds === undefined)).toEqual([])
  })

  test("every figure the page type names as a part has a declaration beside it", async () => {
    const stated = await propertiesDeclared()
    const declared = new Set(
      stated.filter((one) => one.formula !== undefined).map((one) => one.slug)
    )
    const named = wakeDay.partSlugs
      .filter((one) => one.startsWith("formula-property/"))
      .map((one) => one.slice("formula-property/".length))
    expect(named.filter((one) => !declared.has(one))).toEqual([])
  })

  test("a sort of property with no kind written down bars every figure", async () => {
    const judged = figuresIn(
      { ...wakeDay, partSlugs: [...wakeDay.partSlugs, "no-such-property/whatever"] },
      await propertiesDeclared()
    )
    if (!("barred" in judged)) throw new Error("nothing was barred")
    expect(judged.barred).toContain("no kind is written down for `no-such-property`")
    expect(KIND_OF["number-property"]).toBe("number")
  })

  test("a figure reading a key no day carries is refused", async () => {
    const stated = [
      ...(await propertiesDeclared()),
      { slug: "made-up", formula: "{no-such-key-at-all} + 1", holds: "number" },
    ]
    const judged = figuresIn(
      { ...wakeDay, partSlugs: [...wakeDay.partSlugs, "formula-property/made-up"] },
      stated
    )
    if (!("barred" in judged)) throw new Error("nothing was barred")
    expect(judged.barred).toBe(
      "checking — no property is declared under the key `no-such-key-at-all`"
    )
    expect(judged.keys).toEqual(["madeUp"])
  })

  test("renaming one key darkens every figure reaching it and no other", async () => {
    const declared = declaredFrom(wakeDay, await propertiesDeclared())
    const renamed = declared.map((one) =>
      one.slug === "faith-points"
        ? { ...one, slug: "faith-points-renamed", key: "faithPointsRenamed" }
        : one
    )
    const over = workingOver("wake-day", renamed)
    if (over === null || !("barred" in over)) throw new Error("nothing was barred")
    expect(over.keys).toEqual(["faithLevel", "faithStoplight", "stoplights", "totalLevel"])
  })

  test("surplus hours is no key this page type carries", async () => {
    const declared = declaredFrom(wakeDay, await propertiesDeclared())
    expect(declared.map((one) => one.key)).not.toContain("surplusHours")
  })
})
