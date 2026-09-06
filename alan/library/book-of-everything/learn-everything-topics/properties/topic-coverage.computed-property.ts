import type { ComputedProperty } from "@akasha/pages/computed-property"

export type TopicCoverage = number

export const topicCoverage = {
  id: "01a077f4-79d0-7bb7-8479-4ac07775d561",
  pageTypeSlug: "computed-property",
  slug: "topic-coverage",
  propertySlug: "coverage",
  definition: "how far Alan has got into a topic and all beneath it",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A leaf's coverage is its own depth.",
    },
    {
      invariantKind: "departure",
      statement: "A branch weighs its own depth and the mean of its children equally.",
    },
    {
      invariantKind: "departure",
      statement: "A child no coverage is worked out for counts nought in the mean of the children.",
    },
  ],
} as const satisfies ComputedProperty
