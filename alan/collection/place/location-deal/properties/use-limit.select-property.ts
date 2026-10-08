import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const useLimit = {
  id: "01a06585-5fc5-73dd-8b25-bb4b4eaf5918",
  type: "page-type/select-property",
  slug: "use-limit",
  propertySlug: "use-limit",
  definition: "how many times the offer may be claimed",
  values: ["1", "2", "3", "no-limit"],
  types: "ts",
  createdAt: "2026-09-03T04:27:14.757Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
