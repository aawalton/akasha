import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexIdentities = {
  id: "01a0a55d-2c78-7c53-87cd-08cb21c485ff",
  type: "module",
  slug: "index-identities",
  definition: "every index a page's identity is filed in, asked of each index in turn",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller filing a page's identity asks here rather than asking each index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each index is asked through the code beside that index's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index the page states no identifier for answers nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The indexes are asked in the order a page is reached by: id, then type, then scope.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unique kind no index files is a fault rather than a value filed nowhere.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing is filed here that an index beside its own page does not file.",
    },
  ],
} as const satisfies Module
