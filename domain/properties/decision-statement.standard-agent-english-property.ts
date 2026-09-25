import type { StandardAgentEnglishProperty } from "akasha/domain/plain-language/standard-agent-english/property/standard-agent-english-property.page-type.types.ts"

export const decisionStatement = {
  id: "01a049c8-3ead-7c41-ae0b-d4c110afbc4f",
  type: "page-type/standard-agent-english-property",
  slug: "decision-statement",
  propertySlug: "statement",
  definition: "a sentence a decision has a page to",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies StandardAgentEnglishProperty
