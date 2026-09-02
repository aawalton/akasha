import { foodDrink } from "../writ-i18n/writ-i18n.module.code.ts"
import { add as logAdd } from "../writ-log/writ-log.module.code.ts"
import { matRowFromLink } from "../writ-mat-row/writ-mat-row.module.code.ts"
import { FOODDRINK_TO_RECIPE_ITEM_ID } from "../writ-prov-recipe-map/writ-prov-recipe-map.module.code.ts"
import type { MatList } from "../writ-types/writ-types.module.code.ts"
import { fail } from "../writ-util/writ-util.module.code.ts"

export interface Recipe {
  class: string
  fooddrinkItemId: number | undefined
  recipe_item_id: number | undefined
  recipe_link: string | undefined
  is_known: boolean | undefined
  mat_list: MatList
  fooddrink_link: string | undefined
  fooddrink_name: string | undefined
  fooddrinkItemType?: number | undefined
  fooddrinkSpecializedItemType?: number | undefined
}

interface RecipeArgs {
  fooddrinkItemId?: number | undefined
  recipe_item_id?: number | undefined
  recipe_link?: string | undefined
  is_known?: boolean | undefined
}

export function newRecipe(args: RecipeArgs): Recipe {
  return {
    class: "provisioning",
    fooddrinkItemId: args.fooddrinkItemId,
    recipe_item_id: args.recipe_item_id,
    recipe_link: args.recipe_link,
    is_known: args.is_known,
    mat_list: [],
    fooddrink_link: undefined,
    fooddrink_name: undefined,
  }
}

export function recipeFromFoodDrinkItemId(fooddrinkItemId: number): Recipe | undefined {
  const o = newRecipe({ fooddrinkItemId })
  o.recipe_item_id = FOODDRINK_TO_RECIPE_ITEM_ID[fooddrinkItemId]
  if (o.recipe_item_id === undefined) {
    return undefined
  }
  o.recipe_link = string.format(
    "|H1:item:%d:1:36:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
    o.recipe_item_id
  )
  o.fooddrink_link = GetItemLinkRecipeResultItemLink(o.recipe_link, LINK_STYLE_DEFAULT)
  o.fooddrink_name = foodDrink(GetItemLinkItemId(o.fooddrink_link))
  o.is_known = IsItemLinkRecipeKnown(o.recipe_link)

  const [fooddrinkItemType, fooddrinkSpecializedItemType] = GetItemLinkItemType(o.fooddrink_link)
  o.fooddrinkItemType = fooddrinkItemType
  o.fooddrinkSpecializedItemType = fooddrinkSpecializedItemType

  const logT = {
    fooddrinkItemId,
    recipe_item_id: o.recipe_item_id,
    recipe_link: o.recipe_link,
    fooddrink_link: o.fooddrink_link,
    fooddrink_name: o.fooddrink_name,
    is_known: o.is_known,
    fooddrink_item_type: o.fooddrinkItemType,
    fooddrink_specialized_item_type: o.fooddrinkSpecializedItemType,
  }
  logAdd(logT)

  const matCt = GetItemLinkRecipeNumIngredients(o.recipe_link)
  const cookCt = 2
  for (let ingrIndex = 1; ingrIndex <= matCt; ingrIndex += 1) {
    const [, , ingrCt] = GetItemLinkRecipeIngredientInfo(o.recipe_link, ingrIndex)
    const ingrLink = GetItemLinkRecipeIngredientItemLink(
      o.recipe_link,
      ingrIndex,
      LINK_STYLE_DEFAULT
    )
    if (0 < ingrCt && ingrLink !== "") {
      const mr = matRowFromLink(ingrLink, ingrCt * cookCt)
      if (mr !== undefined) {
        o.mat_list[o.mat_list.length] = mr
      }
    }
  }
  return o
}

export function findRecipe(fooddrinkItemId: number): Recipe | undefined {
  const recipe = recipeFromFoodDrinkItemId(fooddrinkItemId)
  if (recipe === undefined) {
    return fail("TemperWrit: recipe not found:" + tostring(fooddrinkItemId))
  }
  return recipe
}

export interface ProvisioningNamespace {
  savedVarVersion: number
  FOODDRINK_TO_RECIPE_ITEM_ID: Readonly<Record<number, number>>
  FindRecipe: (this: void, fooddrinkItemId: number) => Recipe | undefined
  Parser?: { class: string }
}

const PROVISIONING_NAMESPACE: ProvisioningNamespace = {
  savedVarVersion: 2,
  FOODDRINK_TO_RECIPE_ITEM_ID,
  FindRecipe: findRecipe,
}

TemperWrit.Provisioning = PROVISIONING_NAMESPACE
