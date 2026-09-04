import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Paragraph = number

export const paragraph = {
  id: "01a06558-a991-707e-8ed8-d4d213635cdc",
  pageTypeSlug: "number-property",
  slug: "paragraph",
  propertySlug: "paragraph",
  definition: "which paragraph of its chapter a naming stands in",
  max: null,
} as const satisfies NumberProperty
