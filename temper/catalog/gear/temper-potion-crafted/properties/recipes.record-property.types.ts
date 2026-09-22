import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { RecipeReagents } from "akasha/temper/catalog/gear/temper-potion-crafted/properties/recipe-reagents.multi-relation-property.types.ts"

export type Recipes = List<{
  reagents: RecipeReagents
}>
