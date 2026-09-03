import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BuildLevel = number

export const buildLevel = {
  id: "01a06577-f385-7354-bb91-8b1949512f4a",
  pageTypeSlug: "number-property",
  slug: "build-level",
  propertySlug: "level",
  definition: "the level a character has reached",
  max: null,
} as const satisfies NumberProperty
