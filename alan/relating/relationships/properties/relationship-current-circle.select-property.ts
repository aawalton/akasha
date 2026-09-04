import type { SelectProperty } from "@akasha/pages-system/select-property"

export const relationshipCurrentCircle = {
  id: "01a06594-c6e2-7657-a778-b726cb004ee3",
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
