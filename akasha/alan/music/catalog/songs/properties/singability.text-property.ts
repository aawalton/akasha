import type { TextProperty } from "@akasha/pages-system/text-property"
import type { Rating } from "../../properties/rating.text-property.ts"

export type Singability = Rating

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
      statement: "A singability is graded on the ladder a rating is graded on.",
    },
  ],
} as const satisfies TextProperty
