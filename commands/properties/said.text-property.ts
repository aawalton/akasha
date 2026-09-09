import type { TextProperty } from "@akasha/pages/text-property"

export type Said = string

export const said = {
  id: "01a05027-c468-7aba-9ec6-e02a71e9af84",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "said",
  propertySlug: "said",
  definition: "how one thing a command takes is spelled on the command line",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The text here is typed as that text is.",
    },
    {
      invariantKind: "departure",
      statement: "A value a flag has is named in angle brackets after the flag.",
    },
  ],
} as const satisfies TextProperty
