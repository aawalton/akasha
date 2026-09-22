import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const openQuestion = {
  id: "01a077d9-ec58-7954-9180-8711659f84bd",
  type: "page-type/text-property",
  slug: "open-question",
  propertySlug: "ask",
  definition: "what is still open about a topic, put as a question",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask is written as a question rather than as a note naming a gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask has no paragraph break.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
