import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const said = {
  id: "01a05027-c468-7aba-9ec6-e02a71e9af84",
  type: "page-type/text-property",
  slug: "said",
  propertySlug: "said",
  definition: "how a thing a command takes is spelled on the command line",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The text here is typed as that text is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value a flag has is named in angle brackets after the flag.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
