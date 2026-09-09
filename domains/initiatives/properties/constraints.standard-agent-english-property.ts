import type { StandardAgentEnglishProperty } from "../../standard-agent-english/properties/standard-agent-english-property.page-type.ts"

export type Constraints = string

export const constraints = {
  id: "01a058a3-b01f-7000-8216-401fe8124486",
  pageTypeSlug: "standard-agent-english-property",
  type: "standard-agent-english-property",
  slug: "constraints",
  propertySlug: "constraints",
  definition: "a bound the work is done within",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A constraint is never worked and never met.",
    },
    {
      invariantKind: "departure",
      statement: "A constraint that no longer bounds the work is deleted.",
    },
  ],
} as const satisfies StandardAgentEnglishProperty
