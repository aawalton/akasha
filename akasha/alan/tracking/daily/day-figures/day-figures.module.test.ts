import { describe, expect, test } from "bun:test"
import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { wakeDay } from "../wake-days/wake-day.page-type.ts"
import { type Figure, figuresIn, KIND_OF, shapeOf } from "./day-figures.module.code.ts"

const PROPERTIES_AT = join(dirname(import.meta.dir), "wake-days", "properties")

const ENDING = ".formula-property.ts"

/**
 * Every figure the wake day declares, read off the folder rather than listed here.
 *
 * A list written in a test is a second speller: a figure landed and left off it is a figure nothing
 * checks, and the test goes on passing. The folder cannot miss one. What the folder can do is come
 * back empty — a moved folder reads exactly like a page type with no figures — so the count is
 * asserted below before anything is made of the verdicts.
 */
async function figuresDeclared(): Promise<readonly Figure[]> {
  const named = readdirSync(PROPERTIES_AT)
    .filter((one) => one.endsWith(ENDING))
    .sort()
  const figures: Figure[] = []
  for (const one of named) {
    const held = (await import(join(PROPERTIES_AT, one))) as Readonly<Record<string, unknown>>
    for (const value of Object.values(held)) {
      const declared = value as { slug?: unknown; formula?: unknown }
      if (typeof declared.slug !== "string" || typeof declared.formula !== "string") continue
      figures.push({ slug: declared.slug, formula: declared.formula })
    }
  }
  return figures
}

describe("the figures a wake day works out", () => {
  test("the page type declares figures at all", async () => {
    const figures = await figuresDeclared()
    expect(figures.length).toBeGreaterThanOrEqual(16)
  })

  test("every figure reads only keys the wake day declares", async () => {
    const figures = await figuresDeclared()
    const verdicts = figuresIn(wakeDay.partSlugs, figures)
    expect(verdicts.filter((one) => !one.ok)).toEqual([])
    expect(verdicts.length).toBe(figures.length)
  })

  test("every figure the page type names as a part has a declaration beside it", async () => {
    const figures = await figuresDeclared()
    const declared = new Set(figures.map((one) => one.slug))
    const named = wakeDay.partSlugs
      .filter((one) => one.startsWith("formula-property/"))
      .map((one) => one.slice("formula-property/".length))
    expect(named.filter((one) => !declared.has(one))).toEqual([])
  })

  test("a sort of property with no kind written down is refused rather than dropped", () => {
    expect(() => shapeOf(["no-such-property/whatever"])).toThrow(/no kind is written down/)
    expect(KIND_OF["number-property"]).toEqual({ kind: "number" })
  })

  test("a figure reading a key no day carries is refused", () => {
    const verdicts = figuresIn(wakeDay.partSlugs, [
      { slug: "made-up", formula: "{no-such-key-at-all} + 1" },
    ])
    expect(verdicts).toEqual([
      {
        slug: "made-up",
        ok: false,
        why: "checking — no property is declared under the key `no-such-key-at-all`",
      },
    ])
  })
})
