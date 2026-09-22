import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const debuffId = {
  id: "01a05fd1-d439-75b3-92b0-1243e1ad274a",
  type: "page-type/text-property",
  slug: "debuff-id",
  propertySlug: "debuff-id",
  definition: "the harmful effect a thing puts on its target",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    { decisionKind: "decision-kind/gap", statement: "This property is a relation to a debuff." },
  ],
  types: "ts",
} as const satisfies TextProperty
