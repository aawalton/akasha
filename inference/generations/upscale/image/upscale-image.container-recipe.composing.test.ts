import { expect, test } from "bun:test"
import { dirname } from "node:path"
import { recipeIn } from "akasha/inference/generations/upscale/image/upscale-image.container-recipe.composing.code.ts"
import {
  committedRecipe,
  copiedFrom,
} from "akasha/infrastructure/container-image/recipe-proving/recipe-proving.module.code.ts"

const HERE = dirname(import.meta.path)

test("the recipe composed here is the recipe committed beside this test, byte for byte", () => {
  expect(recipeIn()).toBe(committedRecipe(HERE))
})

test("the recipe copies no path out of this repository", () => {
  expect(copiedFrom(recipeIn())).toEqual([])
})
