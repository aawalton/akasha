import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const fixedValue = {
  id: "01a08834-233c-7012-b368-59193396cdb4",
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
      statement: "A fixed value is not a default.",
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
      statement: "An optional property with a fixed value is on a page or is not.",
    },
    {
      invariantKind: "departure",
      statement: "A page says neither way.",
    },
    {
      invariantKind: "stopgap",
      statement: "A fixed value is written as text whatever kind its property holds.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
