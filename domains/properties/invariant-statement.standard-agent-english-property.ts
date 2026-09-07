import type { StandardAgentEnglishProperty } from "../standard-agent-english/standard-agent-english-properties/standard-agent-english-property.page-type.ts"

export type InvariantStatement = string

export const invariantStatement = {
  id: "01a049c8-3ead-7c41-ae0b-d4c110afbc4f",
  pageTypeSlug: "standard-agent-english-property",
  slug: "invariant-statement",
  propertySlug: "statement",
  definition: "one sentence an invariant holds a page to",
  maxLength: 100,
  nameFormatSlug: null,
} as const satisfies StandardAgentEnglishProperty
