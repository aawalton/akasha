import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TopicDepth = number

export const topicDepth = {
  id: "01a0659f-93da-7001-bf0d-9c170af2e774",
  pageTypeSlug: "number-property",
  slug: "topic-depth",
  propertySlug: "depth",
  definition: "how far Alan has got into a topic itself",
  max: null,
} as const satisfies NumberProperty
