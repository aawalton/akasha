import type { StandardAgentEnglishProperty } from "../standard-agent-english/properties/standard-agent-english-property.page-type.ts"

export type Warrant = string

export const warrant = {
  id: "01a049c9-3a2c-73fb-98e4-6576fd3968b4",
  pageTypeSlug: "standard-agent-english-property",
  type: "standard-agent-english-property",
  slug: "warrant",
  propertySlug: "warrant",
  definition: "the general fact an act follows from",
  maxLength: 100,
  nameFormat: null,
} as const satisfies StandardAgentEnglishProperty
