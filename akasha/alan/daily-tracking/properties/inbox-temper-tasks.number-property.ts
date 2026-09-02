import type { NumberProperty } from "@akasha/pages-system/number-property"

export type InboxTemperTasks = number

export const inboxTemperTasks = {
  id: "01a05fd8-c30f-72a7-b777-962fc8e10d4b",
  pageTypeSlug: "number-property",
  slug: "inbox-temper-tasks",
  propertySlug: "inbox-temper-tasks",
  definition: "the game tasks left undone at the end of a day",
  max: null,
} as const satisfies NumberProperty
