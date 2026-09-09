import type { StandardAgentEnglishProperty } from "../../standard-agent-english/properties/standard-agent-english-property.page-type.ts"

export type IntentStatement = string

export const intentStatement = {
  id: "01a05f19-7b27-7bb1-955d-9086b34c5c30",
  pageTypeSlug: "standard-agent-english-property",
  type: "standard-agent-english-property",
  slug: "intent-statement",
  propertySlug: "statement",
  definition: "one sentence saying what an initiative is to make so",
  maxLength: 100,
  nameFormat: null,
} as const satisfies StandardAgentEnglishProperty
