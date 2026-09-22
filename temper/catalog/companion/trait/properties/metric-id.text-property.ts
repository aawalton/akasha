import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const metricId = {
  id: "01a05fb0-3ced-7636-a899-431b497b3f1f",
  type: "page-type/text-property",
  slug: "metric-id",
  propertySlug: "metric-id",
  definition: "the number an effect moves",
  maxLength: 200,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    { decisionKind: "decision-kind/gap", statement: "This property is a relation to a metric." },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Eighteen of the metrics named here are no pages.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A metric tree's page is named for that metric's kind and this name joined.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A list of metric names written by hand in code is what every reader of a metric reads.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
