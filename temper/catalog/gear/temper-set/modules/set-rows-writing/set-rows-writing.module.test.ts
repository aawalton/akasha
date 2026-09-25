import { describe, expect, test } from "bun:test"
import {
  type SetRowsPage,
  setsRowsBody,
} from "akasha/temper/catalog/gear/temper-set/modules/set-rows-writing/set-rows-writing.module.code.ts"

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

const NO_SET: SetRowsPage = {
  value: {
    slug: "no-set",
    title: "No Set",
    esoSetId: 0,
    hashPlace: 0,
    category: NONE,
    valid: ["*"],
  },
  bonuses: [],
  icons: [],
}

const CLASS_SET: SetRowsPage = {
  value: {
    slug: "a-class-set",
    title: "A Class Set",
    esoSetId: 700,
    hashPlace: 1,
    category: CLASS,
    classId: WARDEN,
    valid: ["*:heavy"],
  },
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

function bodyOf(pages: readonly SetRowsPage[]): string {
  const written = setsRowsBody(pages, KEYS)
  if ("refused" in written) throw new Error(written.refused)
  return written.body
}

describe("setsRowsBody", () => {
  test("writes each set at the place its page states, whatever order the pages came in", () => {
    const body = bodyOf([CLASS_SET, NO_SET])
    expect(body.indexOf('"id":"no-set"')).toBeLessThan(body.indexOf('"id":"a-class-set"'))
  })

  test("writes a category, class, metric and buff as the key of the page named", () => {
    const body = bodyOf([CLASS_SET])
    expect(body).toContain('"subcategoryId":"class"')
    expect(body).toContain('"classId":"warden"')
    expect(body).toContain(
      '{"metricId":"stamina-maximum","effectType":"integer","effectValue":1096}'
    )
    expect(body).toContain('{"buffId":"major-resolve"}')
  })

  test("writes a bonus stating no effect with no effect, and each icon under its slot", () => {
    const body = bodyOf([CLASS_SET])
    expect(body).toContain('"count":5,"status":"unsupported","effects":[]')
    expect(body).toContain('"icons":{"ring":"/ring.dds"}')
  })

  test("refuses a page naming a page that states no key", () => {
    const written = setsRowsBody(
      [{ ...NO_SET, value: { ...NO_SET.value, category: "category/nowhere" } }],
      KEYS
    )
    expect("refused" in written && written.refused).toContain("category/nowhere")
  })
})
