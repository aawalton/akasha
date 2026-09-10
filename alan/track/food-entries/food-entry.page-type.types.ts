import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { EstimatedCalories } from "./properties/estimated-calories.number-property.ts"
import type { FoodEntryNote } from "./properties/food-entry-note.file-property.ts"
import type { HappenedAt } from "./properties/happened-at.instant-property.ts"
import type { PlantGrams } from "./properties/plant-grams.number-property.ts"

export type FoodEntry = Page & {
  title: Title
  happenedAt: HappenedAt
  plantGrams?: PlantGrams
  estimatedCalories?: EstimatedCalories
  note?: FoodEntryNote
}
