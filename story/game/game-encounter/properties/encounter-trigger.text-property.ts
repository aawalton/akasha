import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const encounterTrigger = {
  id: "01a0c647-c745-7738-80ec-1bb7629351a1",
  type: "page-type/text-property",
  slug: "encounter-trigger",
  propertySlug: "trigger",
  definition: "what the player does that sets an encounter going",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
