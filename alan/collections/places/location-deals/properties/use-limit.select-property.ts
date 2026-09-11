import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const useLimit = {
  id: "01a06585-5fc5-73dd-8b25-bb4b4eaf5918",
  type: "select-property",
  slug: "use-limit",
  propertySlug: "use-limit",
  definition: "how many times the offer may be claimed",
  values: ["1", "2", "3", "no-limit"],
  types: "ts",
} as const satisfies SelectProperty
