import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayFigures = {
  id: "01a06949-857c-7000-86a0-989e679e36a7",
  pageTypeSlug: "module",
  slug: "day-figures",
  definition: "the figures a tracked day works out from the readings it stores",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A figure reads only keys the day's own page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A figure may read another figure.",
    },
    {
      invariantKind: "departure",
      statement: "A sort of property with no kind written down is refused rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "The checker the reader runs is the checker run here.",
    },
    {
      invariantKind: "departure",
      statement: "A figure states the kind that figure answers.",
    },
    {
      invariantKind: "departure",
      statement: "Renaming a key darkens every figure reaching that key and no other figure.",
    },
    {
      invariantKind: "departure",
      statement: "A part the page type does not name is left out here and carried by the reader.",
    },
    {
      invariantKind: "departure",
      statement: "A figure refused before a landing is a figure the reader would refuse after.",
    },
  ],
} as const satisfies Module
