import type { ComputedProperty } from "@akasha/pages/computed-property"

export type TopicCoverage = number

export const topicCoverage = {
  id: "01a077f4-79d0-7bb7-8479-4ac07775d561",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "topic-coverage",
  propertySlug: "coverage",
  definition: "how far Alan has got into a topic and all beneath it",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A leaf's coverage is the rank of its own mastery level.",
    },
    {
      invariantKind: "departure",
      statement: "A branch weighs its own rank and the mean of its children equally.",
    },
    {
      invariantKind: "departure",
      statement: "A child no coverage is worked out for counts nought in the mean of the children.",
    },
    {
      invariantKind: "departure",
      statement:
        "Coverage runs unbroken over the same nought-to-seven scale a mastery level is ranked on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A branch's coverage is unmoved by a child added or dropped at the mean of the other children.",
    },
    {
      invariantKind: "departure",
      statement: "Raising a child's coverage raises the coverage of the branch above that child.",
    },
    {
      invariantKind: "departure",
      statement: "Lowering a child's coverage lowers the coverage of the branch above that child.",
    },
    {
      invariantKind: "departure",
      statement:
        "A branch weighs its own rank at one half however many children sit beneath that branch.",
    },
    {
      invariantKind: "departure",
      statement: "One half is the even split chosen rather than a weight these truths force.",
    },
  ],
} as const satisfies ComputedProperty
