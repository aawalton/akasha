import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Said = string

export const said = {
  id: "01a05027-c468-7aba-9ec6-e02a71e9af84",
  pageTypeSlug: "text-property",
  slug: "said",
  propertySlug: "said",
  definition: "how one thing a command takes is spelled on the command line",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "What stands here is typed as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A value a flag carries is named in angle brackets after it.",
    },
  ],
} as const satisfies TextProperty
