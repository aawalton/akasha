import type { TextProperty } from "../../../text-properties/text-property.page-type.ts"

export type PropertySlug = string

export const propertySlug = {
  id: "01a0539b-2a0f-7187-ba5a-aa8bff23fe15",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "property-slug",
  propertySlug: "property-slug",
  definition: "the key a page has this property's value under",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A key is unique among the properties one page type carries including the properties inherited.",
    },
    {
      invariantKind: "departure",
      statement: "A key stands alone among the fields one record property has.",
    },
    {
      invariantKind: "departure",
      statement: "A slug stands alone among the pages of one property type.",
    },
    {
      invariantKind: "departure",
      statement: "The key a page has is this slug written in camel.",
    },
    {
      invariantKind: "departure",
      statement: "Every property states a property slug.",
    },
    {
      invariantKind: "departure",
      statement: "A key drops the words its declarer's name already says.",
    },
    {
      invariantKind: "departure",
      statement: "A qualifier only the slug's wider scope needed is not carried into the key.",
    },
  ],
} as const satisfies TextProperty
