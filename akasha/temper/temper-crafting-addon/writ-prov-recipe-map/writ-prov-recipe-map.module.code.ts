import { FOODDRINK_TO_RECIPE_ITEM_ID_PART_1 } from "../writ-prov-recipe-map-1/writ-prov-recipe-map-1.module.code.ts"
import { FOODDRINK_TO_RECIPE_ITEM_ID_PART_2 } from "../writ-prov-recipe-map-2/writ-prov-recipe-map-2.module.code.ts"

export const FOODDRINK_TO_RECIPE_ITEM_ID: Readonly<Record<number, number>> = {
  ...FOODDRINK_TO_RECIPE_ITEM_ID_PART_1,
  ...FOODDRINK_TO_RECIPE_ITEM_ID_PART_2,
}
