import type { StandardAgentEnglishProperty } from "akasha/domain/plain-language/standard-agent-english/property/standard-agent-english-property.page-type.types.ts"

export const styleRuleAct = {
  id: "01a0de9c-aef3-7d3a-b05d-dca860312f0c",
  type: "page-type/standard-agent-english-property",
  slug: "style-rule-act",
  propertySlug: "act",
  definition: "what a style rule tells a writer to do",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies StandardAgentEnglishProperty
