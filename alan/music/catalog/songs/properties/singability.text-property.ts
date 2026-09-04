import type { Rung } from "@akasha/pages-system/rank-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type Singability = Rung

export const singability = {
  id: "01a06243-144b-700b-83e8-f1b91786511f",
  pageTypeSlug: "text-property",
  slug: "singability",
  propertySlug: "singability",
  definition: "Alan's grade for how well a song sits in his own voice",
  max: 2,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A singability is graded on the ladder a rank is graded on.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a rank rather than text.",
    },
  ],
} as const satisfies TextProperty
