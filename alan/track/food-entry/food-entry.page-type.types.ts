import type { EstimatedCalories } from "akasha/alan/track/food-entry/properties/estimated-calories.number-property.types.ts"
import type { FoodEntryNote } from "akasha/alan/track/food-entry/properties/food-entry-note.file-property.types.ts"
import type { HappenedAt } from "akasha/alan/track/food-entry/properties/happened-at.instant-property.types.ts"
import type { PlantGrams } from "akasha/alan/track/food-entry/properties/plant-grams.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type FoodEntry = Page & {
  title: Title
  happenedAt: HappenedAt
  plantGrams?: PlantGrams
  estimatedCalories?: EstimatedCalories
  note?: FoodEntryNote
}
