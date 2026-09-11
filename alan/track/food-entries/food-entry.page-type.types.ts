import type { EstimatedCalories } from "akasha/alan/track/food-entries/properties/estimated-calories.number-property.types.ts"
import type { FoodEntryNote } from "akasha/alan/track/food-entries/properties/food-entry-note.file-property.types.ts"
import type { HappenedAt } from "akasha/alan/track/food-entries/properties/happened-at.instant-property.types.ts"
import type { PlantGrams } from "akasha/alan/track/food-entries/properties/plant-grams.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type FoodEntry = Page & {
  title: Title
  happenedAt: HappenedAt
  plantGrams?: PlantGrams
  estimatedCalories?: EstimatedCalories
  note?: FoodEntryNote
}
