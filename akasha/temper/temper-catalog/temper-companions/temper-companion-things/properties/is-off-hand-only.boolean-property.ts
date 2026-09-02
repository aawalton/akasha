import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsOffHandOnly = boolean

export const isOffHandOnly = {
  id: "01a05fcd-aed1-7aee-a94b-06283cd02728",
  pageTypeSlug: "boolean-property",
  slug: "is-off-hand-only",
  propertySlug: "is-off-hand-only",
  definition: "whether a weapon is held in the off hand alone",
} as const satisfies BooleanProperty
