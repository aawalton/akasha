import type { StandardAgentEnglishProperty } from "akasha/domain/plain-language/standard-agent-english/property/standard-agent-english-property.page-type.types.ts"

export const constraints = {
  id: "01a058a3-b01f-7000-8216-401fe8124486",
  type: "page-type/standard-agent-english-property",
  slug: "constraints",
  propertySlug: "constraints",
  definition: "a bound the work is done within",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A constraint is never worked and never met.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A constraint that no longer bounds the work is deleted.",
    },
  ],
  types: "ts",
} as const satisfies StandardAgentEnglishProperty
