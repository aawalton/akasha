import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageStem = {
  id: "01a05c53-bc6b-7dba-8a4d-0388f0ff1db2",
  type: "page-type/module",
  slug: "page-stem",
  definition: "free text folded into a page's part of a file name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An accented letter keeps its letter and loses its mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apostrophe closes the gap rather than opening a gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of anything else becomes one dash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stem carries no dash at either end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hundred characters a page's slug holds is named here for every minter.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here shortens a stem, which is done where the stem is minted.",
    },
  ],
} as const satisfies Module
