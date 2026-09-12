import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  committedRecipe,
  copiedFrom,
} from "akasha/infrastructure/container-image/recipe-proving/recipe-proving.module.code.ts"
import { bodyIn } from "akasha/infrastructure/inference/generations/wan/image/wan-image.container-recipe.composing.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const CONTEXT = dirname(HERE)

const OWN = "wan-image.container-recipe.composing.code.ts"

test("the recipe composed here is the recipe committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(committedRecipe(HERE))
})

test("every path the recipe copies in is a file that is there in the build's folder", () => {
  const gone = copiedFrom(bodyIn(ROOT)).filter((one) => !existsSync(join(CONTEXT, one)))
  expect(gone).toEqual([])
})

test("the code composing the recipe spells none of the paths that recipe copies", () => {
  const own = readFileSync(join(HERE, OWN), "utf8")
  expect(copiedFrom(bodyIn(ROOT)).filter((one) => own.includes(one))).toEqual([])
})

test("the recipe copies one path out of this repository", () => {
  expect(copiedFrom(bodyIn(ROOT))).toHaveLength(1)
})
