import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexShape = {
  id: "01a05867-bb6d-7a3e-875e-b5a55432fb00",
  type: "page-type/module",
  slug: "index-shape",
  definition: "the shapes answering a read of the index",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape here names the answer to a read of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader takes a shape from here rather than from the code that does the reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes.",
    },
  ],
} as const satisfies Module
