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
      statement: "A figure may read another figure worked out before it.",
    },
    {
      invariantKind: "departure",
      statement: "A sort of property with no kind written down is refused rather than left out.",
    },
    {
      invariantKind: "gap",
      statement:
        "A formula property states no kind, so what a figure comes out as is only checked.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing works a figure out at the reader, so a day answers with the key empty.",
    },
  ],
} as const satisfies Module
