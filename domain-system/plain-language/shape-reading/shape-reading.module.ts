import type { Module } from "@akasha/code-system/module"

export const shapeReading = {
  id: "01a05dba-d49f-70b7-a3a3-7eb1c069e14d",
  pageTypeSlug: "module",
  slug: "shape-reading",
  definition: "the sentence shapes the index names, read for the rules they carry",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape is found in the index rather than by walking the pages.",
    },
    {
      invariantKind: "departure",
      statement: "A shape Alan has not decided reads as nothing rather than as false.",
    },
    {
      invariantKind: "departure",
      statement: "A shape that will not load refuses the read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds a grammar.",
    },
  ],
} as const satisfies Module
