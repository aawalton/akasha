import { describe, expect, test } from "bun:test"
import type { Reach } from "../computed-properties/computed-property.page-type.ts"
import type { Held } from "../computing/page-computing.module.code.ts"
import { workIn } from "./calculation-loading.module.code.ts"

const REACH: Reach = { target: () => null, naming: () => [] }

const AT = "day/properties/sleep-hours.computed-property.code.ts"

const CALCULATION = [
  'import type { Work } from "@akasha/pages/computed-property"',
  'import type { Day } from "../day.page-type.ts"',
  "",
  "export const work: Work<Day, number> = (page) => {",
  "  const volume = page.strengthVolume",
  "  return volume === undefined ? null : volume / 7",
  "}",
].join("\n")

const MILLIS = "day/modules/millis/millis.computed-property-module.code.ts"

const HOURS = "day/modules/hours/hours.computed-property-module.code.ts"

const MILLIS_FROM = "../millis/millis.computed-property-module.code.ts"

const HOURS_FROM = "../modules/hours/hours.computed-property-module.code.ts"

const SHARED = new Map<string, string>([
  [MILLIS, ["export function anHour(): number {", "  return 3600000", "}"].join("\n")],
  [
    HOURS,
    [
      `import { anHour } from "${MILLIS_FROM}"`,
      "",
      "export function hoursBetween(from: number, to: number): number {",
      "  return (to - from) / anHour()",
      "}",
    ].join("\n"),
  ],
])

const SHARING = [
  'import type { Work } from "@akasha/pages/computed-property"',
  `import { hoursBetween } from "${HOURS_FROM}"`,
  "",
  "export const work = (page) => hoursBetween(page.startTime, page.endTime)",
].join("\n")

const RENAMING = [
  `import { hoursBetween as spanned } from "${HOURS_FROM}"`,
  "",
  "export const work = (page) => spanned(page.startTime, page.endTime)",
].join("\n")

const SPAN: Held = { startTime: 0, endTime: 7200000 }

describe("the calculation a code file exports", () => {
  test("a code file exporting `work` answers that function", () => {
    const loaded = workIn(CALCULATION, AT, () => null)
    if ("failed" in loaded) throw new Error(loaded.failed)
    expect(loaded.work({ strengthVolume: 700 } as Held, REACH)).toBe(100)
  })

  test("a calculation reading a key the page does not carry answers nothing", () => {
    const loaded = workIn(CALCULATION, AT, () => null)
    if ("failed" in loaded) throw new Error(loaded.failed)
    expect(loaded.work({} as Held, REACH)).toBe(null)
  })

  test("a type an import names is gone before the text is run", () => {
    expect("failed" in workIn(CALCULATION, AT, () => null)).toBe(false)
  })

  test("a code file exporting no `work` is refused by what that file does export", () => {
    const loaded = workIn("export const other = 1\nexport const another = 2\n", AT, () => null)
    if (!("failed" in loaded)) throw new Error("nothing was refused")
    expect(loaded.failed).toContain("`another`, `other`")
    expect(loaded.failed).toContain("the export named `work`")
  })

  test("a code file exporting nothing at all is refused", () => {
    const loaded = workIn("const work = 1\n", AT, () => null)
    if (!("failed" in loaded)) throw new Error("nothing was refused")
    expect(loaded.failed).toContain("exports nothing")
  })

  test("a code file importing a value that is no computed-property-module does not load", () => {
    const body = 'import { each } from "./neighbour.ts"\nexport const work = () => each\n'
    expect("failed" in workIn(body, AT, () => null)).toBe(true)
  })

  test("a code file that will not parse is refused rather than thrown out of", () => {
    expect("failed" in workIn("export const work = (\n", AT, () => null)).toBe(true)
  })
})

describe("a calculation importing a computed-property-module", () => {
  test("the function that module exports runs", () => {
    const loaded = workIn(SHARING, AT, (path) => SHARED.get(path) ?? null)
    if ("failed" in loaded) throw new Error(loaded.failed)
    expect(loaded.work(SPAN, REACH)).toBe(2)
  })

  test("a name the import renames is read under the name the import gives it", () => {
    const loaded = workIn(RENAMING, AT, (path) => SHARED.get(path) ?? null)
    if ("failed" in loaded) throw new Error(loaded.failed)
    expect(loaded.work(SPAN, REACH)).toBe(2)
  })

  test("a module that module imports is folded too", () => {
    const loaded = workIn(
      SHARING,
      AT,
      (path) => (path === HOURS ? SHARED.get(HOURS) : null) ?? null
    )
    if (!("failed" in loaded)) throw new Error("nothing was refused")
    expect(loaded.failed).toContain(MILLIS)
  })

  test("an import reaching no file refuses the load by the path it reached", () => {
    const loaded = workIn(SHARING, AT, () => null)
    if (!("failed" in loaded)) throw new Error("nothing was refused")
    expect(loaded.failed).toContain(HOURS)
  })

  test("a name the module does not declare refuses the load by that name", () => {
    const body = `import { hoursApart } from "${HOURS_FROM}"\nexport const work = () => hoursApart\n`
    const loaded = workIn(body, AT, (path) => SHARED.get(path) ?? null)
    if (!("failed" in loaded)) throw new Error("nothing was refused")
    expect(loaded.failed).toContain("hoursApart")
  })
})
