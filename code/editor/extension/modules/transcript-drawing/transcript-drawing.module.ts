import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transcriptDrawing = {
  id: "01a06811-01d3-7002-bee9-dca9b509d3d2",
  type: "module",
  slug: "transcript-drawing",
  definition: "the html a transcript's entries are drawn as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every value drawn is escaped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A result past the character limit is clipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clipped result says how many characters are not shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tool call with no result is drawn as pending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tool call that failed is marked as failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent transcript is drawn inside the call that started that transcript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent nested past the depth limit is said to be too deep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent the reader has not read is said to be unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A disclosure has the id of the call that disclosure draws.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
