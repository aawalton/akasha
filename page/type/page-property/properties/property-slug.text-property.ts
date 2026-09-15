import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const propertySlug = {
  id: "01a0539b-2a0f-7187-ba5a-aa8bff23fe15",
  type: "text-property",
  slug: "property-slug",
  propertySlug: "property-slug",
  definition: "the key a page has this property's value under",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key is unique among the properties one page type carries including the properties inherited.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key stands alone among the fields one record property has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug stands alone among the pages of one property type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key a page has is this slug written in camel.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every property states a property slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key drops the words its declarer's name already says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A qualifier only the slug's wider scope needed is not carried into the key.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
