import type { SelectProperty } from "@akasha/pages-system/select-property"

export const masteryLevel = {
  id: "01a06582-bd62-7187-be50-aa4e75fcf746",
  pageTypeSlug: "select-property",
  slug: "mastery-level",
  propertySlug: "mastery-level",
  definition: "how far a part of Alan's chess has come",
  values: ["novice", "developing", "strong", "expert"],
} as const satisfies SelectProperty

export type MasteryLevel = (typeof masteryLevel.values)[number]
