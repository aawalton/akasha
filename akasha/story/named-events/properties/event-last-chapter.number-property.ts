import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EventLastChapter = number

export const eventLastChapter = {
  id: "01a0658b-9f41-72f6-9d22-6849ab7f7c6b",
  pageTypeSlug: "number-property",
  slug: "event-last-chapter",
  propertySlug: "last-chapter",
  definition: "the latest chapter it can have happened in",
  max: null,
} as const satisfies NumberProperty
