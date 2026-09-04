import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Ply = number

export const ply = {
  id: "01a06582-bd62-794e-a78c-f444799d1093",
  pageTypeSlug: "number-property",
  slug: "ply",
  propertySlug: "ply",
  definition: "how many half-moves a game ran to",
  max: null,
} as const satisfies NumberProperty
