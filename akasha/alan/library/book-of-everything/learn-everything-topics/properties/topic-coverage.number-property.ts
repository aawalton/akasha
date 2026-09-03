import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TopicCoverage = number

export const topicCoverage = {
  id: "01a0659f-93da-7002-970e-d7a7d9c73f1b",
  pageTypeSlug: "number-property",
  slug: "topic-coverage",
  propertySlug: "coverage",
  definition: "how far Alan has got into a topic and all beneath it",
  max: null,
} as const satisfies NumberProperty
