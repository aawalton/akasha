import { expect, test } from "bun:test"
import { dirname } from "node:path"
import { recipeIn } from "akasha/infrastructure/container-image/postgres-cnpg-image/postgres-cnpg-image.container-recipe.composing.code.ts"
import { committedRecipe } from "akasha/infrastructure/container-image/recipe-proving/recipe-proving.module.code.ts"

const HERE = dirname(import.meta.path)

const COPY = "COPY "

const OUTSIDE = "--"

function copiedFrom(recipe: string): readonly string[] {
  const found: string[] = []
  for (const line of recipe.split("\n")) {
    if (!line.startsWith(COPY)) continue
    const from = line.slice(COPY.length).split(" ")[0]
    if (from === undefined || from.startsWith(OUTSIDE)) continue
    found.push(from)
  }
  return found
}

test("the recipe composed here is the recipe committed beside this test, byte for byte", () => {
  expect(recipeIn()).toBe(committedRecipe(HERE))
})

test("the recipe copies no path out of this repository at all", () => {
  expect(copiedFrom(recipeIn())).toEqual([])
})
