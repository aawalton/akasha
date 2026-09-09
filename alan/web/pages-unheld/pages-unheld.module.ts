import type { Module } from "@akasha/code/module"

export const pagesUnheld = {
  id: "01a0655d-daab-7e2d-87b3-2f04937720ed",
  pageTypeSlug: "module",
  slug: "pages-unheld",
  definition: "a page read and a page written where nothing is held between calls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type the pages system does not hold is refused rather than read as nothing.",
    },
    { invariantKind: "departure", statement: "A refusal takes the shape its caller can carry." },
    {
      invariantKind: "absence",
      statement: "Nothing answers zero, null or the empty set for a page type it cannot see.",
    },
  ],
} as const satisfies Module
