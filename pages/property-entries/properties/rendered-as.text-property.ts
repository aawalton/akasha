import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"

export type RenderedAs = string

export const renderedAs = {
  id: "01a07cf4-b901-765b-8af0-c41424d855b9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "rendered-as",
  propertySlug: "rendered-as",
  definition: "the type a screen draws this property's value as",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property naming no type here is drawn as that property's page type is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A name here is a type a screen already draws.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry shape drawn as progress counts from the fields ending in current and total.",
    },
    {
      invariantKind: "departure",
      statement: "An entry shape drawn as progress labels each line by that line's one text field.",
    },
    {
      invariantKind: "departure",
      statement: "An entry shape drawn as progress orders its lines by display-order.",
    },
  ],
} as const satisfies TextProperty
