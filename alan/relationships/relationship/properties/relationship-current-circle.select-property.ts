import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const relationshipCurrentCircle = {
  id: "01a06594-c6e2-7657-a778-b726cb004ee3",
  type: "page-type/select-property",
  slug: "relationship-current-circle",
  propertySlug: "relationship-current-circle",
  definition: "how close to Alan this person is now",
  values: [
    "pair-bond",
    "intimates",
    "confidants",
    "community",
    "affiliates",
    "acquaintances",
    "deceased",
  ],
  types: "ts",
  createdAt: "2026-09-03T04:44:04.194Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies SelectProperty
