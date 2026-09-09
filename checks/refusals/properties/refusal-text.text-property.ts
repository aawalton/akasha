import type { TextProperty } from "@akasha/pages/text-property"

export type RefusalText = string

export const refusalText = {
  id: "01a0699d-4001-7b32-8d47-5e19c4a7f003",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "refusal-text",
  propertySlug: "text",
  definition: "the words a refusal prints, with holes to fill",
  maxLength: 2000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hole is marked in braces and filled as the words are printed.",
    },
    {
      invariantKind: "departure",
      statement: "A hole named in the text and handed no value refuses the printing.",
    },
  ],
} as const satisfies TextProperty
