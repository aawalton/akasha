import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const takes = {
  id: "01a05027-c468-7573-9eec-f4d1ecd0bced",
  type: "page-type/text-property",
  slug: "takes",
  propertySlug: "takes",
  definition: "the use of a thing a command takes",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The takes text sits on one line beside the said text.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T00:52:58.600Z",
  updatedAt: "2026-09-22T14:08:17.000Z",
} as const satisfies TextProperty
