import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const writtenBy = {
  id: "01a08234-d8ba-7bb5-9be6-95a087589e12",
  type: "text-property",
  slug: "written-by",
  propertySlug: "written-by",
  definition: "the command a generated declaration is written again by",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command is spelled as a reader would say the command on a command line.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
