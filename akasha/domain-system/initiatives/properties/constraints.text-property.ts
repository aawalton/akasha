import type { TextProperty } from "@akasha/pages-system/text-property"

export type Constraints = string

export const constraints = {
  id: "01a058a3-b01f-7000-8216-401fe8124486",
  pageTypeSlug: "text-property",
  slug: "constraints",
  propertySlug: "constraints",
  definition: "a bound the work is done within",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A constraint is never worked and never met.",
    },
    {
      invariantKind: "departure",
      statement: "A constraint that no longer bounds the work is deleted.",
    },
  ],
} as const satisfies TextProperty
