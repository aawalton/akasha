import type { TextProperty } from "@akasha/pages-system/text-property"

export type TopicCalibrationRead = string

export const topicCalibrationRead = {
  id: "01a0659f-93da-7004-9fe6-95aad72ded87",
  pageTypeSlug: "text-property",
  slug: "topic-calibration-read",
  propertySlug: "calibration-read",
  definition: "how well Alan read his own grasp of a topic, written out",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
