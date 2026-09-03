import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PartsProgressInWords = number

export const partsProgressInWords = {
  id: "01a06959-98a7-7e83-8ec2-6370d810f6b3",
  pageTypeSlug: "number-property",
  slug: "parts-progress-in-words",
  propertySlug: "parts-progress-in-words",
  definition: "how far through the collections this one holds the reading has come, in words",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This value is added up over the collection's parts rather than stated on it.",
    },
    {
      invariantKind: "departure",
      statement: "What is added up is each part's own total progress in words.",
    },
    {
      invariantKind: "gap",
      statement: "A formula cannot yet add a property up over the pages a relation reaches.",
    },
  ],
} as const satisfies NumberProperty
