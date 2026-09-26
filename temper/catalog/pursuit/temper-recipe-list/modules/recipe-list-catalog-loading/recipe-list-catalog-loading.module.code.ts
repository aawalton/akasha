import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  heldRecipeCatalog,
  holdRecipeCatalog,
  RECIPE_LIST_FIELDS,
  type RecipeCatalog,
  recipeCatalogOf,
} from "akasha/temper/catalog/pursuit/temper-recipe-list/modules/recipe-list-catalog/recipe-list-catalog.module.code.ts"
import { temperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.ts"

const EVERY = 1000

export async function loadRecipeCatalog(): Promise<RecipeCatalog> {
  const already = heldRecipeCatalog()
  if (already !== null) return already
  const { rows } = await getPages({
    pageTypeSlug: temperRecipeList.slug,
    select: [...RECIPE_LIST_FIELDS],
    limit: EVERY,
  })
  return holdRecipeCatalog(recipeCatalogOf(rows))
}
