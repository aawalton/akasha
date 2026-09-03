import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FirstChapter = number

export const firstChapter = {
  id: "01a0658b-9f41-739b-9968-7c608d74e30f",
  pageTypeSlug: "number-property",
  slug: "first-chapter",
  propertySlug: "first-chapter",
  definition: "the earliest chapter it can have happened in",
  max: null,
} as const satisfies NumberProperty
