import type { StandardAgentEnglishProperty } from "akasha/domain/plain-language/standard-agent-english/property/standard-agent-english-property.page-type.types.ts"

export const aids = {
  id: "01a049c9-3a2c-7044-a7e7-234356b9df18",
  type: "page-type/standard-agent-english-property",
  slug: "aids",
  propertySlug: "aids",
  definition: "the rulings on acts a reader is about to take, each approving or refusing",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An aid runs to the length an act or a warrant runs to.",
    },
  ],
  types: "ts",
} as const satisfies StandardAgentEnglishProperty
