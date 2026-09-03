import type { SelectProperty } from "@akasha/pages-system/select-property"

export const relationshipCurrentCircle = {
  id: "01a0658a-f4df-74b8-bed5-a98159f49f93",
  pageTypeSlug: "select-property",
  slug: "relationship-current-circle",
  propertySlug: "relationship-current-circle",
  definition: "how close to Alan this person stands now",
  values: [
    "pair-bond",
    "intimates",
    "confidants",
    "community",
    "affiliates",
    "acquaintances",
    "deceased",
  ],
} as const satisfies SelectProperty

export type RelationshipCurrentCircle = (typeof relationshipCurrentCircle.values)[number]
