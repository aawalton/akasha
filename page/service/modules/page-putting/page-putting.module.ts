import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagePutting = {
  id: "01a0c943-9a75-7159-95f4-e5966596feda",
  type: "page-type/module",
  slug: "page-putting",
  definition: "a composed page named to the mechanical change that puts it or takes it away",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller hands over what a composing answered rather than a path and a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change that works out what kind of path it is is the one named here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands what it names.",
    },
  ],
} as const satisfies Module
