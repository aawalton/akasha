import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const writtenBy = {
  id: "01a08234-d8ba-7bb5-9be6-95a087589e12",
  type: "page-type/text-property",
  slug: "written-by",
  propertySlug: "written-by",
  definition: "the command writing a generated declaration again",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The command is spelled as a reader would say the command on a command line.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
