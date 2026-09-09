import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type FixedValue = string

export const fixedValue = {
  id: "01a08834-233c-7012-b368-59193396cdb4",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "fixed-value",
  propertySlug: "fixed",
  definition: "the value every page of a type has for a property, stated by none of them",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page states no value for a property whose declaration fixes one.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating one is refused rather than read as agreeing.",
    },
    {
      invariantKind: "departure",
      statement: "A fixed value is not a default, since no page may state another.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration fixing a value states no default.",
    },
    {
      invariantKind: "departure",
      statement: "A required property with a fixed value is on every page of the type.",
    },
    {
      invariantKind: "departure",
      statement: "An optional one is on a page or is not, and the page says neither way.",
    },
    {
      invariantKind: "stopgap",
      statement: "A fixed value is written as text whatever kind its property holds.",
    },
  ],
} as const satisfies TextProperty
