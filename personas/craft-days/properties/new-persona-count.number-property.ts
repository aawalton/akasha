import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const newPersonaCount = {
  id: "01a0655b-4a9b-7005-ae52-6dec6ae581ad",
  type: "number-property",
  slug: "new-persona-count",
  propertySlug: "new-persona-count",
  definition: "how many personas came to be on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
