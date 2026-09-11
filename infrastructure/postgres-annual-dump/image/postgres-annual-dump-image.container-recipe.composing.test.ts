import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  committedRecipe,
  copiedFrom,
} from "akasha/infrastructure/container-image/recipe-proving/recipe-proving.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { recipeIn } from "./postgres-annual-dump-image.container-recipe.composing.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const CONTEXT = dirname(HERE)

const OWN = "postgres-annual-dump-image.container-recipe.composing.code.ts"

test("the recipe composed here is the recipe committed beside this test, byte for byte", () => {
  expect(recipeIn(ROOT)).toBe(committedRecipe(HERE))
})

test("every path the recipe copies in is a file that is there in the build's folder", () => {
  const gone = copiedFrom(recipeIn(ROOT)).filter((one) => !existsSync(join(CONTEXT, one)))
  expect(gone).toEqual([])
})

test("the code composing the recipe spells none of the paths that recipe copies", () => {
  const own = readFileSync(join(HERE, OWN), "utf8")
  expect(copiedFrom(recipeIn(ROOT)).filter((one) => own.includes(one))).toEqual([])
})

test("the recipe copies one path out of this repository", () => {
  expect(copiedFrom(recipeIn(ROOT))).toHaveLength(1)
})
