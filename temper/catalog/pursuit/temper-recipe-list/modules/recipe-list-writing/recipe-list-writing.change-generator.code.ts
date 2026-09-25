import type { Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { partsReading } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import { type Shadow, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { quoted } from "akasha/temper/catalog/world/lorebook/modules/lore-book-rendering/lore-book-rendering.module.code.ts"
import { z } from "zod"

const LIST = "temper-recipe-list"
const TABLE = "data-table"
const TABLE_SLUG = "recipe-data"
const RECIPES = "recipes"
const JSONL = "jsonl"
const RECIPE_TYPES =
  "akasha/temper/player/completion/modules/recipe-types/recipe-types.module.code.ts"

type Written = {
  readonly edits: readonly Replacing[]
  readonly said: readonly string[]
}

const NOTHING: Written = { edits: [], said: [] }

type Recipe = { readonly itemId: number; readonly name: string }

type RecipeList = {
  readonly listIndex: number
  readonly name: string
  readonly recipes: readonly Recipe[]
}

const ROW = z.object({ recipeItemId: z.number(), recipeName: z.string() })

function recipesOf(change: Change, path: string): Recipe[] {
  const recipes: Recipe[] = []
  for (const [, text] of partsReading(path, RECIPES, JSONL, (at) => textOf(change.after(at)))) {
    for (const line of text.split("\n")) {
      if (line.trim() === "") continue
      const row = ROW.parse(JSON.parse(line))
      recipes.push({ itemId: row.recipeItemId, name: row.recipeName })
    }
  }
  return recipes
}

function listsIn(change: Change, shadow: Shadow): RecipeList[] {
  const lists: RecipeList[] = []
  for (const one of shadow.index.everyOfType(LIST)) {
    const value = shadow.pageOf(one.path)
    if (value === null) continue
    lists.push({
      listIndex: Number(value.displayOrder),
      name: String(value.title),
      recipes: value.recipes === JSONL ? recipesOf(change, one.path) : [],
    })
  }
  return lists.sort((left, right) => left.listIndex - right.listIndex)
}

function listText(list: RecipeList): string {
  const recipes = list.recipes
    .map((one) => `      { itemId: ${String(one.itemId)}, name: ${quoted(one.name)} },\n`)
    .join("")
  return (
    `  {\n    listIndex: ${String(list.listIndex)},\n    name: ${quoted(list.name)},\n` +
    `    recipes: [\n${recipes}    ],\n  },\n`
  )
}

export function recipeDataText(lists: readonly RecipeList[]): string {
  return (
    `import type { RecipeListEntry } from "${RECIPE_TYPES}"\n\n` +
    `export const RECIPE_DATA: readonly RecipeListEntry[] = [\n${lists.map(listText).join("")}]\n`
  )
}

function tableAt(shadow: Shadow): string | null {
  const listed = shadow.index.listedAt(TABLE, TABLE_SLUG)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  return at === undefined ? null : besideAt(at, "code", "ts")
}

function turning(path: string): boolean {
  const said = partedIn(path)
  if (said === null) return false
  return said.pageType === LIST || (said.pageType === TABLE && said.slug === TABLE_SLUG)
}

export function couldTurn(change: Change): boolean {
  return change.changed.some(turning)
}

function writtenOver(change: Change, shadow: Shadow): Written {
  const code = tableAt(shadow)
  if (code === null) {
    return {
      edits: [],
      said: [`no ${TABLE} holds ${TABLE_SLUG}, so the recipe table was not written`],
    }
  }
  const was = textOf(change.after(code))
  const text = recipeDataText(listsIn(change, shadow))
  if (was === null || was === text) return NOTHING
  return {
    edits: [{ kind: "replace", path: code, contentFrom: was, contentTo: text }],
    said: [`\`${code}\` was written again from the recipe list pages`],
  }
}

export function generateChange(change: Change): Written {
  try {
    if (!couldTurn(change)) return NOTHING
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING
    return writtenOver(change, cast.shadow)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { edits: [], said: [`no recipe table was written — ${why}`] }
  }
}
