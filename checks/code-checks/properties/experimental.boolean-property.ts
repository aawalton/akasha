import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Experimental = boolean

export const experimental = {
  id: "01a08ced-e365-7000-bdb0-9acbc5810934",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "experimental",
  propertySlug: "experimental",
  definition: "whether a check has landed and does not yet judge",
} as const satisfies BooleanProperty
