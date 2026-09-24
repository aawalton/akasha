import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const propertySlug = {
  id: "01a0539b-2a0f-7187-ba5a-aa8bff23fe15",
  type: "page-type/text-property",
  slug: "property-slug",
  propertySlug: "property-slug",
  definition: "the key of this property's value on a page",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key is unique among the properties one page type carries including the properties inherited.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key stands alone among the fields one record property has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug stands alone among the pages of one property type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key a page has is this slug written in camel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every property states a property slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property slug drops the words its declarer's name already says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A qualifier only the page's slug needed is not carried into the property slug.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
