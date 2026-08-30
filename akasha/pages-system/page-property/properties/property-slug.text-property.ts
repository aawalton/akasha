import type { TextProperty } from "../../text-property/text-property.page-type.ts"

export type PropertySlug = string

export const propertySlug = {
  id: "01a0539b-2a0f-7187-ba5a-aa8bff23fe15",
  pageTypeSlug: "text-property",
  slug: "property-slug",
  propertySlug: "property-slug",
  definition: "the key a page carries this property's value under",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A key stands alone among the properties one page type carries, counting what it inherits, where a slug stands alone among the pages of one property type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The key a page carries is this written in camel, so a property is reached by its slug and read by its key.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every property states this, because a slug long enough to stand alone across a page type is rarely the key a page should carry.",
    },
  ],
} as const satisfies TextProperty
