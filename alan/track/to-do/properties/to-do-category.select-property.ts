import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const toDoCategory = {
  id: "01a065a1-49b7-7818-8c36-a35dbf94fcc6",
  type: "page-type/select-property",
  slug: "to-do-category",
  propertySlug: "to-do-category",
  definition: "the list that holds a to-do in the app",
  values: ["faith", "health", "inbox", "love", "wealth"],
  types: "ts",
  createdAt: "2026-09-03T04:57:44.119Z",
  updatedAt: "2026-10-30T16:44:43.847Z",
} as const satisfies SelectProperty
