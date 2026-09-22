import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const version = {
  id: "01a05fd8-c30e-725c-ab9a-c6711e453753",
  type: "page-type/text-property",
  slug: "version",
  propertySlug: "version",
  definition: "which shape of a record was written",
  maxLength: 10,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A version is taken as a number and is written as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing a version as a number would flatten `1.0` to `1`.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
