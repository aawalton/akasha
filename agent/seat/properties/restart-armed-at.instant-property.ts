import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const restartArmedAt = {
  id: "01a0542c-d18e-7fcc-af7e-824542ba448e",
  type: "page-type/instant-property",
  slug: "restart-armed-at",
  propertySlug: "armed-at",
  definition: "when work was sent to a seat's supervisor",
  types: "ts",
} as const satisfies InstantProperty
