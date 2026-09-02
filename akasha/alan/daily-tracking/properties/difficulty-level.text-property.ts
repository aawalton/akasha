import type { TextProperty } from "@akasha/pages-system/text-property"

export type DifficultyLevel = string

export const difficultyLevel = {
  id: "01a05fd8-c30f-7785-9331-9f5fa8347452",
  pageTypeSlug: "text-property",
  slug: "difficulty-level",
  propertySlug: "difficulty-level",
  definition: "how hard what Alan was doing was on him",
  max: 3,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A difficulty level reads as a number and is written as text.",
    },
  ],
} as const satisfies TextProperty
