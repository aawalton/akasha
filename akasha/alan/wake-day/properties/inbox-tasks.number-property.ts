import type { NumberProperty } from "@akasha/pages-system/number-property"

export type InboxTasks = number

export const inboxTasks = {
  id: "01a05fd8-c30f-7e4a-927e-ab31ffeac442",
  pageTypeSlug: "number-property",
  slug: "inbox-tasks",
  propertySlug: "inbox-tasks",
  definition: "the tasks left undone at the end of a day",
  max: null,
} as const satisfies NumberProperty
