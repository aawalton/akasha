import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const compacting = {
  id: "01a06cba-1bd3-7935-8f52-e91af0fc1bf4",
  type: "page-type/boolean-property",
  slug: "compacting",
  propertySlug: "compacting",
  definition: "whether a seat's context is being replaced by a summary of itself",
  types: "ts",
} as const satisfies BooleanProperty
