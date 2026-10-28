import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const socialIsolation = {
  id: "01a18411-4183-7147-9e7b-e6b1d692817f",
  type: "page-type/select-property",
  slug: "social-isolation",
  propertySlug: "social-isolation",
  definition: "whether a person lives with few social contacts",
  values: ["isolated", "not-isolated"],
  types: "ts",
  createdAt: "2026-10-28T19:51:25.825Z",
  updatedAt: "2026-10-28T19:51:25.825Z",
} as const satisfies SelectProperty
