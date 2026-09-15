import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const routingCore = {
  id: "01a05bd6-c535-767d-b8ac-7e540084e42d",
  type: "module",
  slug: "routing-core",
  definition: "the page keys the store holds in columns of their own",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key held in a column of its own is read back under that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column with nothing is read back as null.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the attributes have is read back under that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The instant a page was marked done is in a column of its own.",
    },
  ],
} as const satisfies Module
