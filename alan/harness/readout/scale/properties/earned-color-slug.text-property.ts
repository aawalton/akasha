import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const earnedColorSlug = {
  id: "01a06230-b155-7e50-83eb-ed2efad60e63",
  type: "text-property",
  slug: "earned-color-slug",
  propertySlug: "earned-color-slug",
  definition: "the color a reading takes when the reading is earned rather than measured",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An earned color is a color a rung has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A scale states a single earned color whatever readouts are read against that scale.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The color a scale names is a page rather than a name held as text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
