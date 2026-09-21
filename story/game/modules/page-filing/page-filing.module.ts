import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageFiling = {
  id: "01a0c652-d33d-74fe-b0c3-150605c0745d",
  type: "page-type/module",
  slug: "page-filing",
  definition: "where a page of a game's world is filed, and the body filed there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of a game's world sits under that game's own folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The type a body imports is read off the page type rather than spelled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key with nothing under it is left off the body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands what it composes.",
    },
  ],
} as const satisfies Module
