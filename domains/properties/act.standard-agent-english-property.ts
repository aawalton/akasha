import type { StandardAgentEnglishProperty } from "../standard-agent-english/properties/standard-agent-english-property.page-type.ts"

export type Act = string

export const act = {
  id: "01a049c9-3a2c-7234-9286-d41a1bc4a7c0",
  pageTypeSlug: "standard-agent-english-property",
  type: "standard-agent-english-property",
  slug: "act",
  propertySlug: "act",
  definition: "what a directive tells its reader to do",
  maxLength: 100,
  nameFormat: null,
} as const satisfies StandardAgentEnglishProperty
