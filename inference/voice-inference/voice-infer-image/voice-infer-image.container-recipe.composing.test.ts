import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { recipeIn } from "./voice-infer-image.container-recipe.composing.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const CONTEXT = dirname(HERE)

const RECIPE = "Containerfile"

const OWN = "voice-infer-image.container-recipe.composing.code.ts"

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
  expect(recipeIn(ROOT)).toBe(committed())
})

test("every path the recipe copies in is a file that is there in the build's folder", () => {
  const gone = copiedFrom(recipeIn(ROOT)).filter((one) => !existsSync(join(CONTEXT, one)))
  expect(gone).toEqual([])
})

test("the code composing the recipe spells none of the paths that recipe copies", () => {
  const own = readFileSync(join(HERE, OWN), "utf8")
  expect(copiedFrom(recipeIn(ROOT)).filter((one) => own.includes(one))).toEqual([])
})

test("the recipe copies five paths out of this repository", () => {
  expect(copiedFrom(recipeIn(ROOT))).toHaveLength(5)
})
