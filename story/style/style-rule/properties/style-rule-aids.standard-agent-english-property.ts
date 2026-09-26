import type { StandardAgentEnglishProperty } from "akasha/domain/plain-language/standard-agent-english/property/standard-agent-english-property.page-type.types.ts"

export const styleRuleAids = {
  id: "01a0de9c-aef3-7750-bd92-391077155046",
  type: "page-type/standard-agent-english-property",
  slug: "style-rule-aids",
  propertySlug: "aids",
  definition: "the rulings on a style rule's edge cases, each approving or refusing",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies StandardAgentEnglishProperty
