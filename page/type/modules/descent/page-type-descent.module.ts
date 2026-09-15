import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeDescent = {
  id: "01a04eca-11d6-7481-9151-c390edc031c2",
  type: "module",
  slug: "page-type-descent",
  definition: "which page types are under a given page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Descent is walked down the reverse of `extends-type` in the edge index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is under itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page type is under `page`, so that descent is every page type filed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type reaching no parent it names is under no other page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller with the index as its change leaves that index is answered from that.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller names the reading and nothing more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug two page types carry is under every type either names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here walks the pages.",
    },
  ],
} as const satisfies Module
