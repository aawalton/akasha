import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EventFirstChapter = number

export const eventFirstChapter = {
  id: "01a0658b-9f41-739b-9968-7c608d74e30f",
  pageTypeSlug: "number-property",
  slug: "event-first-chapter",
  propertySlug: "first-chapter",
  definition: "the earliest chapter it can have happened in",
  max: null,
} as const satisfies NumberProperty
