import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type RestartArmedAt = string

export const restartArmedAt = {
  id: "01a0542c-d18e-7fcc-af7e-824542ba448e",
  pageTypeSlug: "instant-property",
  slug: "restart-armed-at",
  propertySlug: "armed-at",
  definition: "when a seat's restart was armed to fire on its next idle",
} as const satisfies InstantProperty
