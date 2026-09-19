import { expect, test } from "bun:test"
import { colorNamed } from "akasha/code/editor/extension/modules/palette/palette.module.code.ts"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { chalk } from "akasha/design/interface/color/pages/chalk.color.ts"
import { text } from "akasha/design/interface/color/pages/text.color.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ROOT = process.cwd()

const TURN_STATE = "seat-turn-state"

const HEX = /^#[0-9a-f]{6}$/

const TEXT_AT = `${color.slug}/${text.slug}` as const

function colorByState(): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of valuesOfType(ROOT, TURN_STATE)) {
    const slug = textAt(one.value, "slug")
    const named = textAt(one.value, "color")
    if (slug === null || named === null) continue
    found.set(slug, named)
  }
  return found
}

test("every turn state names a color", () => {
  expect(colorByState().size).toBeGreaterThan(0)
})

test("the palette answers every color a turn state names", () => {
  for (const [state, named] of colorByState()) {
    const hex = colorNamed(named)
    expect([state, named, hex === undefined ? "" : HEX.test(hex)]).toEqual([state, named, true])
  }
})

test("a stopped seat is drawn in the text color", () => {
  expect(colorByState().get("stopped")).toBe(TEXT_AT)
  expect(colorNamed(TEXT_AT)).toBe(chalk.hex)
})

test("a name is lowercased before being matched", () => {
  expect(colorNamed("TEXT")).toBe(colorNamed("text"))
})

test("a name matching no color is answered as nothing", () => {
  expect(colorNamed("mauve")).toBeUndefined()
})
