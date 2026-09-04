import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
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

export const foodEntry = {
  id: "01a065a3-6e8b-7516-be17-9b2737f11128",
  pageTypeSlug: "page-type",
  slug: "food-entry",
  definition: "one thing Alan ate, written down",
  pluralSlug: "food-entries",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "file-property/food-entry-note",
    "instant-property/happened-at",
    "number-property/estimated-calories",
    "number-property/plant-grams",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "happened-at", required: true, many: false },
    { pagePropertySlug: "plant-grams", required: false, many: false },
    { pagePropertySlug: "estimated-calories", required: false, many: false },
    { pagePropertySlug: "food-entry-note", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One file holds one thing eaten, and which day it counts to is worked out from the instant it happened at.",
    },
    {
      invariantKind: "absence",
      statement:
        "A food entry that contributes no plants carries no plant grams rather than a zero.",
    },
    {
      invariantKind: "gap",
      statement: "Every food entry Alan logs lands in a file.",
    },
  ],
} as const satisfies PageType
