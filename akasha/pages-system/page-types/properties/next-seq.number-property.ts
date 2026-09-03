import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NextSeq = number

export const nextSeq = {
  id: "01a06973-e90a-76de-be02-4662bda83eac",
  pageTypeSlug: "number-property",
  slug: "next-seq",
  propertySlug: "next-seq",
  definition: "the number the next page of this page type takes as its seq",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq is handed out once and the counter moves on whether or not a page lands.",
    },
    {
      invariantKind: "departure",
      statement: "The counter moves under a lock held on the page type file.",
    },
  ],
} as const satisfies NumberProperty
