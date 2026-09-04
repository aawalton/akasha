import type { TextProperty } from "@akasha/pages-system/text-property"

export type EarnedKey = string

export const earnedKey = {
  id: "01a06230-b155-73b6-8478-2a373c60f343",
  pageTypeSlug: "text-property",
  slug: "earned-key",
  propertySlug: "earned-key",
  definition: "the fact a reading's source carries that earns the scale's earned color",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout stating no earned key never earns a color.",
    },
    {
      invariantKind: "departure",
      statement: "What the key names is true or false rather than a number.",
    },
  ],
} as const satisfies TextProperty
