import type { TextProperty } from "@akasha/pages-system/text-property"

export type EarnedColorSlug = string

export const earnedColorSlug = {
  id: "01a06230-b155-7e50-83eb-ed2efad60e63",
  pageTypeSlug: "text-property",
  slug: "earned-color-slug",
  propertySlug: "earned-color-slug",
  definition: "the color a reading takes when the reading is earned rather than measured",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An earned color is a color a rung carries.",
    },
    {
      invariantKind: "departure",
      statement: "A scale states one earned color whatever readouts are read against that scale.",
    },
    {
      invariantKind: "gap",
      statement: "The color a scale names is a page rather than a name held as text.",
    },
  ],
} as const satisfies TextProperty
