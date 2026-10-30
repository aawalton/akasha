import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const inboxTasksClearedToday = {
  id: "01a05fd8-c30f-7ce6-a65b-6c330789f699",
  type: "page-type/boolean-property",
  slug: "inbox-tasks-cleared-today",
  propertySlug: "inbox-tasks-cleared-today",
  definition: "whether the due unfinished to-dos reached zero on a day",
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T16:33:37.266Z",
} as const satisfies BooleanProperty
