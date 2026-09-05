import { describe, expect, test } from "bun:test"
import type { Held } from "../computing/page-computing.module.code.ts"
import { workIn } from "./calculation-loading.module.code.ts"

const CALCULATION = [
  'import type { Work } from "@akasha/pages-system/computed-property"',
  'import type { WakeDay } from "../wake-day.page-type.ts"',
  "",
  "export const work: Work<WakeDay, number> = (page) => {",
  "  const volume = page.strengthVolume",
  "  return volume === undefined ? null : volume / 7",
  "}",
].join("\n")

describe("the calculation a code file exports", () => {
  test("a code file exporting `work` answers that function", () => {
    const loaded = workIn(CALCULATION)
    if ("failed" in loaded) throw new Error(loaded.failed)
    expect(loaded.work({ strengthVolume: 700 } as Held, { target: () => null })).toBe(100)
  })

  test("a calculation reading a key the page does not carry answers nothing", () => {
    const loaded = workIn(CALCULATION)
    if ("failed" in loaded) throw new Error(loaded.failed)
    expect(loaded.work({} as Held, { target: () => null })).toBe(null)
  })

  test("a type an import names is gone before the text is run", () => {
    expect("failed" in workIn(CALCULATION)).toBe(false)
  })

  test("a code file exporting no `work` is refused by what that file does export", () => {
    const loaded = workIn("export const other = 1\nexport const another = 2\n")
    if (!("failed" in loaded)) throw new Error("nothing was refused")
    expect(loaded.failed).toContain("`another`, `other`")
    expect(loaded.failed).toContain("the export named `work`")
  })

  test("a code file exporting nothing at all is refused", () => {
    const loaded = workIn("const work = 1\n")
    if (!("failed" in loaded)) throw new Error("nothing was refused")
    expect(loaded.failed).toContain("exports nothing")
  })

  test("a code file importing a value rather than a type does not load", () => {
    const loaded = workIn('import { each } from "./neighbour.ts"\nexport const work = () => each\n')
    expect("failed" in loaded).toBe(true)
  })

  test("a code file that will not parse is refused rather than thrown out of", () => {
    const loaded = workIn("export const work = (\n")
    expect("failed" in loaded).toBe(true)
  })
})
