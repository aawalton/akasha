import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MaxQuests = number

export const maxQuests = {
  id: "01a05fcd-f558-7da6-8586-f6450e0e3428",
  pageTypeSlug: "number-property",
  slug: "max-quests",
  propertySlug: "max-quests",
  definition: "how many quests a source gives a skill point for",
  max: null,
} as const satisfies NumberProperty
