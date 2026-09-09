import type { TextProperty } from "@akasha/pages/text-property"

export type QueryKey = string

export const queryKey = {
  id: "01a063bd-a526-759f-a70b-5cdfae809328",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "query-key",
  propertySlug: "query-key",
  definition: "the number a reading takes where its query answers more than one",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is written as the answer carrying that number writes the key.",
    },
    {
      invariantKind: "departure",
      statement: "A readout naming no key takes the one number its query reduces to.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming a number the answer itself has is read off the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A key spent on an argument names no number.",
    },
  ],
} as const satisfies TextProperty
