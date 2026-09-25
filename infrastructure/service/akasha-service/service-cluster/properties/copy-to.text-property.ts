import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const copyTo = {
  id: "01a0d984-8902-7b5f-95ab-88778c7f8393",
  type: "page-type/text-property",
  slug: "copy-to",
  propertySlug: "copy-to",
  definition: "the directory in a checkout files are copied into",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The directory is spelled from the root of the checkout.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
