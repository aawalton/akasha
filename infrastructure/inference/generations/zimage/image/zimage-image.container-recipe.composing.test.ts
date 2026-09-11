import { expect, test } from "bun:test"
import { dirname } from "node:path"
import {
  committedRecipe,
  copiedFrom,
} from "akasha/infrastructure/container-image/recipe-proving/recipe-proving.module.code.ts"
import { bodyIn } from "akasha/infrastructure/inference/generations/zimage/image/zimage-image.container-recipe.composing.code.ts"

const HERE = dirname(import.meta.path)

test("the recipe composed here is the recipe committed beside this test, byte for byte", () => {
  expect(bodyIn()).toBe(committedRecipe(HERE))
})

test("the recipe copies no path out of this repository", () => {
  expect(copiedFrom(bodyIn())).toEqual([])
})
