import type { SelectProperty } from "@akasha/pages-system/select-property"

export const toDoCategory = {
  id: "01a065a1-49b7-7818-8c36-a35dbf94fcc6",
  pageTypeSlug: "select-property",
  slug: "to-do-category",
  propertySlug: "to-do-category",
  definition: "the list a to-do is filed under in the app",
  values: ["faith", "health", "inbox", "love", "wealth"],
} as const satisfies SelectProperty

export type ToDoCategory = (typeof toDoCategory.values)[number]
