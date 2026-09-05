import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type FunStoplight = string

export const funStoplight = {
  id: "01a0721c-cebf-7f14-b3e2-607836e60e86",
  pageTypeSlug: "computed-property",
  slug: "fun-stoplight",
  propertySlug: "fun-stoplight",
  definition: "the rung the day's fun reached, as one colored light",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
