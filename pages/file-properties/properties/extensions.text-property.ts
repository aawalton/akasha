import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const extensions = {
  id: "01a08e1f-408a-7ae7-a4d9-21cdd5a19500",
  type: "text-property",
  slug: "extensions",
  propertySlug: "extensions",
  definition: "the endings a page names this property's file with",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An ending is written without the dot joining it to the name.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose file goes by more than one ending states each of them.",
    },
    {
      invariantKind: "departure",
      statement: "The type a file property has is the endings that property states.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
