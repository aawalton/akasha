import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const about = {
  id: "01a0658a-739f-7163-8cca-6370b5500c7f",
  type: "page-type/select-property",
  slug: "about",
  propertySlug: "about",
  definition: "what the statement is about",
  values: ["myself", "others", "reality"],
  types: "ts",
  createdAt: "2026-09-03T04:32:47.519Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
