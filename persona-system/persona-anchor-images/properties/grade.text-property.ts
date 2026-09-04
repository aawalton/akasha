import type { Rung } from "@akasha/pages-system/rank-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type Grade = Rung

export const grade = {
  id: "01a0655b-4a9b-7003-a822-f4a3ceda67b2",
  pageTypeSlug: "text-property",
  slug: "grade",
  propertySlug: "grade",
  definition: "Alan's mark for how well a picture caught the persona",
  max: 2,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A grade is marked on the ladder a rank is marked on.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a rank rather than text.",
    },
  ],
} as const satisfies TextProperty
