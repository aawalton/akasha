import type { StandardAgentEnglishProperty } from "akasha/domain/plain-language/standard-agent-english/property/standard-agent-english-property.page-type.types.ts"

export const act = {
  id: "01a049c9-3a2c-7234-9286-d41a1bc4a7c0",
  type: "page-type/standard-agent-english-property",
  slug: "act",
  propertySlug: "act",
  definition: "what a directive tells its reader to do",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies StandardAgentEnglishProperty
