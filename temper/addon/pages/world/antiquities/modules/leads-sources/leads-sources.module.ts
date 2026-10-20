import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsSources = {
  id: "01a15a8f-ed2a-72ef-b238-8e4401e5e4a0",
  type: "page-type/module",
  slug: "leads-sources",
  definition: "where an antiquity's lead is had where it is had easily",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lead is had by scrying where the lead table says it is built in or the game needs no lead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lead is had by buying where the lead table says an antique map sells it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lead is had by digging where the lead table says it rewards the dig before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dig reward's parent is the antiquity one id before it, where a built-in lead opens that run.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The lead table runs each zone's built-in lead and its two dig rewards on three ids in a row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No other lead source is said here.",
    },
  ],
  createdAt: "2026-10-20T18:25:44.234Z",
  updatedAt: "2026-10-20T18:25:44.234Z",
} as const satisfies Module
