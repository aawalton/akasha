import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type InboxTemperTasksClearedToday = boolean

export const inboxTemperTasksClearedToday = {
  id: "01a05fd8-c30f-753b-b347-1e8d6b6d0a3c",
  pageTypeSlug: "boolean-property",
  slug: "inbox-temper-tasks-cleared-today",
  propertySlug: "inbox-temper-tasks-cleared-today",
  definition: "whether the game tasks reached empty on a day",
} as const satisfies BooleanProperty
