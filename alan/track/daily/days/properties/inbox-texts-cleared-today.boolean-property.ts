import type { BooleanProperty } from "@akasha/pages/boolean-property"

export type InboxTextsClearedToday = boolean

export const inboxTextsClearedToday = {
  id: "01a05fd8-c30f-7777-9563-2a174aa367d5",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "inbox-texts-cleared-today",
  propertySlug: "inbox-texts-cleared-today",
  definition: "whether the texts reached empty on a day",
} as const satisfies BooleanProperty
