import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TopicCalibration = number

export const topicCalibration = {
  id: "01a0659f-93da-7003-b4ed-cdcc0bbed4b5",
  pageTypeSlug: "number-property",
  slug: "topic-calibration",
  propertySlug: "calibration",
  definition: "how far Alan's own reading of a topic sits from what a probe found",
  max: null,
} as const satisfies NumberProperty
