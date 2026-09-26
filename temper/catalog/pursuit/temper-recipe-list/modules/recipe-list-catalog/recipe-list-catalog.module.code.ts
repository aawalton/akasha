import type { RecipeListEntry } from "akasha/temper/player/completion/modules/recipe-types/recipe-types.module.code.ts"

type Recipe = RecipeListEntry["recipes"][number]

type Row = Readonly<Record<string, unknown>>

export const RECIPE_LIST_FIELDS: readonly string[] = ["slug", "title", "displayOrder", "recipes"]

export interface RecipeCatalog {
  readonly lists: readonly RecipeListEntry[]
  readonly resultByName: ReadonlyMap<string, number>
}

const UNREAD =
  "the recipe catalogue is read from pages, and nothing has read it yet — await `loadRecipeCatalog()` where the work starts, or gate the screen on `RecipeCatalogGate`"

export class RecipeCatalogUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "RecipeCatalogUnread"
  }
}

function recipesIn(held: unknown): readonly Recipe[] {
  if (!Array.isArray(held)) return []
  const recipes: Recipe[] = []
  for (const row of held) {
    if (typeof row !== "object" || row === null) continue
    const { recipeItemId, recipeName } = row as Row
    if (typeof recipeItemId === "number" && typeof recipeName === "string") {
      recipes.push({ itemId: recipeItemId, name: recipeName })
    }
  }
  return recipes
}

function listOf(page: Row): RecipeListEntry {
  return {
    listIndex: Number(page.displayOrder),
    name: String(page.title),
    recipes: recipesIn(page.recipes),
  }
}

export function recipeCatalogOf(pages: Iterable<Row>): RecipeCatalog {
  const lists = [...pages].map(listOf).sort((one, other) => one.listIndex - other.listIndex)
  const resultByName = new Map<string, number>()
  for (const list of lists) {
    for (const recipe of list.recipes) resultByName.set(recipe.name, recipe.itemId)
  }
  return { lists, resultByName }
}

let held: RecipeCatalog | null = null

export function holdRecipeCatalog(catalog: RecipeCatalog): RecipeCatalog {
  held = catalog
  return catalog
}

export function heldRecipeCatalog(): RecipeCatalog | null {
  return held
}

export function recipeCatalog(): RecipeCatalog {
  if (held === null) throw new RecipeCatalogUnread()
  return held
}
