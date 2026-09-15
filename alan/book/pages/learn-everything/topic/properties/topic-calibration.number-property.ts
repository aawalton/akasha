import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const topicCalibration = {
  id: "01a0659f-93da-7003-b4ed-cdcc0bbed4b5",
  type: "page-type/number-property",
  slug: "topic-calibration",
  propertySlug: "calibration",
  definition: "how far Alan's own reading of a topic sits from what a probe found",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
