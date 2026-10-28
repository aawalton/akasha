import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const sex = {
  id: "01a183a9-9a92-76d4-bd97-f1504420604f",
  type: "page-type/select-property",
  slug: "sex",
  propertySlug: "sex",
  definition: "the sex a person was assigned at birth",
  values: ["female", "male"],
  types: "ts",
  createdAt: "2026-10-28T17:58:12.880Z",
  updatedAt: "2026-10-28T17:58:12.880Z",
} as const satisfies SelectProperty
