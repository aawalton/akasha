import { expect, test } from "bun:test"
import { colorNamed } from "akasha/code-system/editor/extension/palette/palette.module.code.ts"
import { chalk } from "akasha/design/interfaces/colors/pages/chalk.color.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ROOT = process.cwd()

const TURN_STATE = "seat-turn-state"

const HEX = /^#[0-9a-f]{6}$/

function colorByState(): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of valuesOfType(ROOT, TURN_STATE)) {
    const slug = textAt(one.value, "slug")
    const color = textAt(one.value, "color")
    if (slug === null || color === null) continue
    found.set(slug, color)
  }
  return found
}

test("every turn state names a color", () => {
  expect(colorByState().size).toBeGreaterThan(0)
})

test("the palette answers every color a turn state names", () => {
  for (const [state, color] of colorByState()) {
    const hex = colorNamed(color)
    expect([state, color, hex === undefined ? "" : HEX.test(hex)]).toEqual([state, color, true])
  }
})

test("a stopped seat is drawn in the text color", () => {
  expect(colorByState().get("stopped")).toBe("text")
  expect(colorNamed("text")).toBe(chalk.hex)
})

test("a name is lowercased before being matched", () => {
  expect(colorNamed("TEXT")).toBe(colorNamed("text"))
})

test("a name matching no color is answered as nothing", () => {
  expect(colorNamed("mauve")).toBeUndefined()
})
