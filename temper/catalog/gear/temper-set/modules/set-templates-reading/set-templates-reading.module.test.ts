import { describe, expect, test } from "bun:test"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  setTemplatesOf,
  Unkeyed,
} from "akasha/temper/catalog/gear/temper-set/modules/set-templates-reading/set-templates-reading.module.code.ts"

const NONE = "category/none"

const CLASS = "category/class"

const WARDEN = "class/warden"

const STAMINA = "metric/stamina"

const RESOLVE = "buff/resolve"

const KEYS = new Map([
  [NONE, "none"],
  [CLASS, "class"],
  [WARDEN, "warden"],
  [STAMINA, "stamina-maximum"],
  [RESOLVE, "major-resolve"],
])

const NO_SET: Value = {
  slug: "no-set",
  title: "No Set",
  esoSetId: 0,
  hashPlace: 0,
  category: NONE,
  valid: ["*"],
}

const CLASS_SET: Value = {
  slug: "a-class-set",
  title: "A Class Set",
  esoSetId: 700,
  hashPlace: 1,
  category: CLASS,
  classId: WARDEN,
  valid: ["*:heavy"],
  bonuses: [
    {
      count: 2,
      status: "supported",
      description: "Adds 1096 Maximum Stamina",
      effects: [{ metricId: STAMINA, type: "integer", value: 1096 }],
    },
    { count: 3, status: "supported", description: "Resolve", effects: [{ buffId: RESOLVE }] },
    { count: 5, status: "unsupported", description: "Something else" },
  ],
  icons: [{ slot: "ring", icon: "/ring.dds" }],
}

describe("setTemplatesOf", () => {
  test("puts each set at the place its page states, whatever order the pages came in", () => {
    expect(setTemplatesOf([CLASS_SET, NO_SET], KEYS).map((one) => one.id)).toEqual([
      "no-set",
      "a-class-set",
    ])
  })

  test("reads a category, class, metric and buff as the key of the page named", () => {
    const [made] = setTemplatesOf([CLASS_SET], KEYS)
    expect(made?.subcategoryId).toBe("class")
    expect(made?.classId).toBe("warden")
    expect(made?.bonuses[0]?.effects).toEqual([
      { metricId: "stamina-maximum", effectType: "integer", effectValue: 1096 },
    ])
    expect(made?.bonuses[1]?.effects).toEqual([{ buffId: "major-resolve" }])
  })

  test("reads a bonus stating no effect as no effect, and each icon under its slot", () => {
    const [made] = setTemplatesOf([CLASS_SET], KEYS)
    expect(made?.bonuses[2]?.effects).toEqual([])
    expect(made?.icons).toEqual({ ring: "/ring.dds" })
  })

  test("throws on a page naming a page that states no key", () => {
    const unkeyed = { ...NO_SET, category: "category/nowhere" }
    expect(() => setTemplatesOf([unkeyed], KEYS)).toThrow(Unkeyed)
  })
})
