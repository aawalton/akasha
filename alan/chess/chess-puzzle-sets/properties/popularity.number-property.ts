import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Popularity = number

export const popularity = {
  id: "01a06582-bd62-76c4-8bdd-2320313c7fbd",
  pageTypeSlug: "number-property",
  slug: "popularity",
  propertySlug: "popularity",
  definition: "how well a puzzle is liked",
  max: null,
} as const satisfies NumberProperty
