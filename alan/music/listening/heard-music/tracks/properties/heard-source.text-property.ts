import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const heardSource = {
  id: "01a06240-340f-700e-a486-9e430bc408b2",
  type: "page-type/text-property",
  slug: "heard-source",
  propertySlug: "heard-source",
  definition: "where a heard track was learned from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A heard source is `observed` or `seed-top-tracks` or `seed-rated` or `seed-prior-window`.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The sources a track is heard from are no pages.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a heard source.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
