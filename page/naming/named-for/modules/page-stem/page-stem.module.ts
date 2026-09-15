import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageStem = {
  id: "01a05c53-bc6b-7dba-8a4d-0388f0ff1db2",
  type: "module",
  slug: "page-stem",
  definition: "free text folded into the part of a file name a page is found by",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An accented letter keeps its letter and loses its mark.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apostrophe closes the gap rather than opening a gap.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of anything else becomes one dash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stem carries no dash at either end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hundred characters a page's slug holds is named here for every minter.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here shortens a stem, which is done where the stem is minted.",
    },
  ],
} as const satisfies Module
