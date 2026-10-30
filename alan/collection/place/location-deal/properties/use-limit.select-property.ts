import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const useLimit = {
  id: "01a06585-5fc5-73dd-8b25-bb4b4eaf5918",
  type: "page-type/select-property",
  slug: "use-limit",
  propertySlug: "use-limit",
  definition: "the number of times a person can use the offer",
  values: ["1", "2", "3", "no-limit"],
  types: "ts",
  createdAt: "2026-09-03T04:27:14.757Z",
  updatedAt: "2026-10-30T15:12:20.140Z",
} as const satisfies SelectProperty
