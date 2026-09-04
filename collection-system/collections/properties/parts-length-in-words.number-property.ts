import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PartsLengthInWords = number

export const partsLengthInWords = {
  id: "01a06959-98a7-7ab5-991b-44150f978745",
  pageTypeSlug: "number-property",
  slug: "parts-length-in-words",
  propertySlug: "parts-length-in-words",
  definition: "how much there is to work through in the collections this one holds, in words",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This value is added up over the collection's parts rather than stated on it.",
    },
    {
      invariantKind: "departure",
      statement: "What is added up is each part's own total length in words.",
    },
    {
      invariantKind: "gap",
      statement: "A formula cannot yet add a property up over the pages a relation reaches.",
    },
  ],
} as const satisfies NumberProperty
