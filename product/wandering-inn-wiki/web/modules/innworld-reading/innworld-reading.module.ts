import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const innworldReading = {
  id: "01a0c61a-8975-7295-9bd9-dd7c9e8d99c7",
  type: "page-type/module",
  slug: "innworld-reading",
  definition: "what a browser is shown of the pages this wiki reaches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser is answered from the server rather than asking the routes again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a reader may reach is the read itself rather than a list kept here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing is answered a page at a time rather than whole.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value a page holds in a file beside it is shown.",
    },
  ],
} as const satisfies Module
