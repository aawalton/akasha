import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Compacting = boolean

export const compacting = {
  id: "01a06cba-1bd3-7935-8f52-e91af0fc1bf4",
  pageTypeSlug: "boolean-property",
  slug: "compacting",
  propertySlug: "compacting",
  definition: "whether a seat's context is being replaced by a summary of itself",
} as const satisfies BooleanProperty
