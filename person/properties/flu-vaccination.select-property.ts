import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const fluVaccination = {
  id: "01a183f5-49ee-7fd5-bf3c-c30f5cb7fa21",
  type: "page-type/select-property",
  slug: "flu-vaccination",
  propertySlug: "flu-vaccination",
  definition: "how often a person is vaccinated against influenza",
  values: ["none", "yearly"],
  types: "ts",
  createdAt: "2026-10-28T19:20:52.972Z",
  updatedAt: "2026-10-28T19:20:52.972Z",
} as const satisfies SelectProperty
