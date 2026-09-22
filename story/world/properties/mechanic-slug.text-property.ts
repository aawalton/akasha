import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mechanicSlug = {
  id: "01a063ce-6216-7007-b529-a31661f9223d",
  type: "page-type/text-property",
  slug: "mechanic-slug",
  propertySlug: "mechanic-slug",
  definition: "the mechanic a reading reaches",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name two kinds of mechanic carry reaches two pages rather than one.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a mechanic.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
