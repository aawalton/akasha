import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { recipeIn } from "./zimage-image.container-recipe.composing.code.ts"

const HERE = dirname(import.meta.path)

const RECIPE = "Containerfile"

const COPY = "COPY "

function committed(): string {
  return readFileSync(join(HERE, RECIPE), "utf8")
}

function copiedFrom(recipe: string): readonly string[] {
  const found: string[] = []
  for (const line of recipe.split("\n")) {
    if (!line.startsWith(COPY)) continue
    const from = line.slice(COPY.length).split(" ")[0]
    if (from !== undefined) found.push(from)
  }
  return found
}

test("the recipe composed here is the recipe committed beside this test, byte for byte", () => {
  expect(recipeIn()).toBe(committed())
})

test("the recipe copies no path out of this repository", () => {
  expect(copiedFrom(recipeIn())).toEqual([])
})
