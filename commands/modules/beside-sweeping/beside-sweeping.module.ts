import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const besideSweeping = {
  id: "01a09497-3f38-7f42-8d3d-b4b296f80bea",
  type: "module",
  slug: "beside-sweeping",
  definition: "the uncommitted files beside a page, gone with the page rather than left behind",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page taken away has the uncommitted files beside it taken away as well.",
    },
    {
      invariantKind: "departure",
      statement: "Which files sit beside a page is read from the page rather than from the folder.",
    },
    {
      invariantKind: "departure",
      statement: "The page read is the one whose own file the change takes away.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no page has nothing swept beside it.",
    },
    {
      invariantKind: "departure",
      statement: "Only a file whose name says the file is uncommitted is swept.",
    },
    {
      invariantKind: "departure",
      statement: "A file the change already names is swept by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A file the tree holds no body at is swept by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A change taking no page away reads no page.",
    },
    {
      invariantKind: "absence",
      statement: "A page a move carries off is swept by nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
