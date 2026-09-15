import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shapeReading = {
  id: "01a05dba-d49f-70b7-a3a3-7eb1c069e14d",
  type: "module",
  slug: "shape-reading",
  definition: "the sentence shapes the index names, read out of their pages",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape is found in the index rather than by walking the pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape Alan has not decided reads as nothing rather than as false.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape that will not load refuses the read.",
    },
  ],
} as const satisfies Module
