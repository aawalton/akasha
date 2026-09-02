import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type InboxTasksClearedToday = boolean

export const inboxTasksClearedToday = {
  id: "01a05fd8-c30f-7ce6-a65b-6c330789f699",
  pageTypeSlug: "boolean-property",
  slug: "inbox-tasks-cleared-today",
  propertySlug: "inbox-tasks-cleared-today",
  definition: "whether the tasks reached empty on a day",
} as const satisfies BooleanProperty
