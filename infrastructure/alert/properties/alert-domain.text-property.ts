import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const alertDomain = {
  id: "01a06755-0778-78ee-bf36-f7fd5ffa5619",
  type: "page-type/text-property",
  slug: "alert-domain",
  propertySlug: "domain",
  definition: "the area a raised alert is owed to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An area is named here as text rather than reached as a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An area named here is not always a page in akasha yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An alert naming a person is owed to that person rather than to an area.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
