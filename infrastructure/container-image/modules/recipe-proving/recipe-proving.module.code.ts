import { readFileSync } from "node:fs"
import { join } from "node:path"

const RECIPE = "Containerfile"

const COPY = "COPY "

export function committedRecipe(here: string): string {
  return readFileSync(join(here, RECIPE), "utf8")
}

export function copiedFrom(recipe: string): readonly string[] {
  const found: string[] = []
  for (const line of recipe.split("\n")) {
    if (!line.startsWith(COPY)) continue
    const from = line.slice(COPY.length).split(" ")[0]
    if (from !== undefined) found.push(from)
  }
  return found
}
