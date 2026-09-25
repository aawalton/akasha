import { expect, test } from "bun:test"
import {
  couldTurn,
  generateChange,
  recipeDataText,
} from "akasha/temper/catalog/pursuit/temper-recipe-list/modules/recipe-list-writing/recipe-list-writing.change-generator.code.ts"

const UNREAD = { root: "/nowhere", before: () => null, after: () => null }

test("a change touching a recipe list's recipes could turn the table", () => {
  const at =
    "temper/catalog/pursuit/temper-recipe-list/pages/tea/tea.temper-recipe-list.recipes.jsonl"
  expect(couldTurn({ ...UNREAD, changed: [at] })).toBe(true)
})

test("a hand edit to the recipe table could turn the table", () => {
  const at = "temper/player/completion/modules/recipe-data/recipe-data.data-table.code.ts"
  expect(couldTurn({ ...UNREAD, changed: [at] })).toBe(true)
})

test("a change touching no recipe list writes nothing", () => {
  const written = generateChange({ ...UNREAD, changed: ["alan/notes/today.md"] })
  expect(written).toEqual({ edits: [], said: [] })
})

test("the table keeps each list's recipes in the order the rows have", () => {
  const text = recipeDataText([
    {
      listIndex: 15,
      name: "Delicacies",
      recipes: [
        { itemId: 87687, name: 'Bowl of "Peeled Eyeballs"' },
        { itemId: 64221, name: "Psijic Ambrosia" },
      ],
    },
  ])
  expect(text).toContain(
    `    listIndex: 15,\n    name: "Delicacies",\n    recipes: [\n` +
      `      { itemId: 87687, name: 'Bowl of "Peeled Eyeballs"' },\n` +
      `      { itemId: 64221, name: "Psijic Ambrosia" },\n    ],\n`
  )
})
