import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const appliesWhen = {
  id: "01a0680a-1a00-7017-a147-8d2b6c5e1117",
  type: "page-type/text-property",
  slug: "applies-when",
  propertySlug: "applies-when",
  definition: "the shape of transaction a direction reaches",
  maxLength: 400,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A direction reaches no transaction outside the shape that direction applies to.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
