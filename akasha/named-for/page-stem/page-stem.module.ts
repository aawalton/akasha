import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageStem = {
  id: "01a05c53-bc6b-7dba-8a4d-0388f0ff1db2",
  pageTypeSlug: "module",
  slug: "page-stem",
  definition: "free text cut down to the part of a file name a page is found by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An accented letter keeps its letter and loses its mark.",
    },
    {
      invariantKind: "departure",
      statement: "An apostrophe closes the gap rather than opening one.",
    },
    {
      invariantKind: "departure",
      statement: "A run of anything else becomes one dash.",
    },
    {
      invariantKind: "constraint",
      statement: "A stem runs to a hundred characters.",
    },
    {
      invariantKind: "departure",
      statement: "A stem cut to length loses the dash the cut left at its end.",
    },
  ],
} as const satisfies Module
