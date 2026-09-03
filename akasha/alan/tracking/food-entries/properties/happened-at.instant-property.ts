import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type HappenedAt = string

export const happenedAt = {
  id: "01a065a3-6e8b-7bdd-b120-c1fbb84bfbd1",
  pageTypeSlug: "instant-property",
  slug: "happened-at",
  propertySlug: "happened-at",
  definition: "when what the entry records took place",
} as const satisfies InstantProperty
