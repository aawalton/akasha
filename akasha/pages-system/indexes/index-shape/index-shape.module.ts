import type { Module } from "@akasha/code-system/module"

export const indexShape = {
  id: "01a05867-bb6d-7a3e-875e-b5a55432fb00",
  pageTypeSlug: "module",
  slug: "index-shape",
  definition: "the shapes a read of the index is answered in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape here says what a read of the index is answered with.",
    },
    {
      invariantKind: "departure",
      statement: "A reader takes a shape from here rather than from what does the reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes.",
    },
  ],
} as const satisfies Module
