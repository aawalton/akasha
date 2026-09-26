import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  holdRecipeCatalog,
  RECIPE_LIST_FIELDS,
  type RecipeCatalog,
  recipeCatalogOf,
} from "akasha/temper/catalog/pursuit/temper-recipe-list/modules/recipe-list-catalog/recipe-list-catalog.module.code.ts"
import { temperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.ts"

export function holdRecipeCatalogFromCheckout(): RecipeCatalog {
  const asked = asking(akashaRoot(), {
    pageTypeSlug: temperRecipeList.slug,
    keys: RECIPE_LIST_FIELDS,
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return holdRecipeCatalog(recipeCatalogOf(asked.rows))
}
