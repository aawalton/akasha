import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedAsking = {
  id: "01a0e86a-1d93-7fc7-8864-8aa95de2706c",
  type: "page-type/module",
  slug: "played-asking",
  definition:
    "the store asked from the play screen, with each fault reported where faults are seen",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused question is reported with the question and the store's reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report from a browser becomes a runtime error of the site.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report is written to the log of whatever process asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal is handed back as it came, so the screen draws what the other questions answered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
