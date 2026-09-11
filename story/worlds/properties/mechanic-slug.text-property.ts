import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const mechanicSlug = {
  id: "01a063ce-6216-7007-b529-a31661f9223d",
  type: "text-property",
  slug: "mechanic-slug",
  propertySlug: "mechanic-slug",
  definition: "the mechanic a reading reaches",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "No mechanic has a page of its own.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a mechanic.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
