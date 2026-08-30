import type { NamePlace } from "../name-place.page-type.ts"

export const propertyKey = {
  id: "01a04fed-2fbf-7545-aff5-168ae23e9052",
  pageTypeSlug: "name-place",
  slug: "property-key",
  definition: "the key a page carries one of its values under",
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is read in code.",
    },
    {
      invariantKind: "departure",
      statement: "The property it names is called by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "Lowering each capital and setting a dash before it gives the slug back.",
    },
    {
      invariantKind: "departure",
      statement: "The two are one name in two formats and neither is the other's second spelling.",
    },
  ],
} as const satisfies NamePlace
