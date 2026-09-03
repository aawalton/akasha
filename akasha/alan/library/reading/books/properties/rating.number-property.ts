import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Rating = number

export const rating = {
  id: "01a06741-dd0f-7004-9b9b-26579c448c7b",
  pageTypeSlug: "number-property",
  slug: "rating",
  propertySlug: "rating",
  definition: "what Alan scored a book out of ten",
  max: 10,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rating is Alan's own score rather than anyone else's.",
    },
    {
      invariantKind: "departure",
      statement: "A book Alan has not scored states no rating.",
    },
  ],
} as const satisfies NumberProperty
