import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const ruleNote = {
  id: "01a0680c-3c00-7005-8d17-4a9c6e3b3106",
  type: "text-property",
  slug: "rule-note",
  propertySlug: "rule-note",
  definition: "what a rule is about, where its clauses do not say",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
