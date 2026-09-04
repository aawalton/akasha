import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NewPersonaCount = number

export const newPersonaCount = {
  id: "01a0655b-4a9b-7005-ae52-6dec6ae581ad",
  pageTypeSlug: "number-property",
  slug: "new-persona-count",
  propertySlug: "new-persona-count",
  definition: "how many personas first stood on a day",
  max: null,
} as const satisfies NumberProperty
