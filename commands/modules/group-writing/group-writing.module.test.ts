import { describe, expect, test } from "bun:test"
import {
  composingAt,
  composingIn,
  recipeAt,
} from "akasha/commands/modules/group-writing/group-writing.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { everyOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ROOT = codeRoot()

const RECIPE_TYPE = "container-recipe"

const PAGE = "here/there/one.container-recipe.ts"

const GROUP = "here/there/one.container-recipe.composing.code.ts"

const RECIPE = "here/there/Containerfile"

describe("where a recipe's composing group sits", () => {
  test("the group's code is beside the page that group composes for", () => {
    expect(composingAt(PAGE)).toBe(GROUP)
  })

  test("a path that is no TypeScript file names no group", () => {
    expect(composingAt(RECIPE)).toBeNull()
  })

  test("the recipe is written beside the page under the name a recipe is under", () => {
    expect(recipeAt(PAGE)).toBe(RECIPE)
  })
})

describe("reaching a composing group", () => {
  test("a group at no path is said rather than thrown", () => {
    expect("missing" in composingIn(ROOT, GROUP)).toBe(true)
  })

  test("every recipe's group answers the function composing the recipe", () => {
    const gone = everyOfType(ROOT, RECIPE_TYPE)
      .map((one) => composingAt(one.path))
      .filter((one) => one === null || "missing" in composingIn(ROOT, one))
    expect(gone).toEqual([])
  })
})
