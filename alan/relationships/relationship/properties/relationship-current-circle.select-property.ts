import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const relationshipCurrentCircle = {
  id: "01a06594-c6e2-7657-a778-b726cb004ee3",
  type: "page-type/select-property",
  slug: "relationship-current-circle",
  propertySlug: "relationship-current-circle",
  definition: "how close this person is to Alan",
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
  updatedAt: "2026-10-30T17:11:42.520Z",
} as const satisfies SelectProperty
