import type { TextProperty } from "@akasha/pages-system/text-property"

export type RuleNote = string

export const ruleNote = {
  id: "01a0680c-3c00-7005-8d17-4a9c6e3b3106",
  pageTypeSlug: "text-property",
  slug: "rule-note",
  propertySlug: "rule-note",
  definition: "what a rule is about, where its clauses do not say",
  max: 300,
  nameFormatSlug: null,
} as const satisfies TextProperty
