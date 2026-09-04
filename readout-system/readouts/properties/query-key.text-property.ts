import type { TextProperty } from "@akasha/pages-system/text-property"

export type QueryKey = string

export const queryKey = {
  id: "01a063bd-a526-759f-a70b-5cdfae809328",
  pageTypeSlug: "text-property",
  slug: "query-key",
  propertySlug: "query-key",
  definition: "the number a reading takes where its query answers more than one",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout naming no key takes the one number its query reduces to.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming a number the answer itself carries is read off the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A key spent on an argument names no number.",
    },
  ],
} as const satisfies TextProperty
