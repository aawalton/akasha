import type { TextProperty } from "@akasha/pages/text-property"

export type TopicCalibrationRead = string

export const topicCalibrationRead = {
  id: "01a0659f-93da-7004-9fe6-95aad72ded87",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "topic-calibration-read",
  propertySlug: "calibration-read",
  definition: "how well Alan read his own grasp of a topic, written out",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
