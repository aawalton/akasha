import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const claimed = {
  id: "01a06558-a991-7120-bee3-994201ef685e",
  type: "boolean-property",
  slug: "claimed",
  propertySlug: "claimed",
  definition: "whether a holder is read out of the text rather than stated by it",
  types: "ts",
} as const satisfies BooleanProperty
