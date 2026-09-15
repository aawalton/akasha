import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const earnedKey = {
  id: "01a06230-b155-73b6-8478-2a373c60f343",
  type: "page-type/text-property",
  slug: "earned-key",
  propertySlug: "earned-key",
  definition: "the fact a reading's source has that earns the scale's earned color",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout stating no earned key never earns a color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fact the key names is true or false rather than a number.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
