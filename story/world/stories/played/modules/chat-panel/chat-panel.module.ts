import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatPanel = {
  id: "01a17eb7-3040-75c3-bb48-6a14f977b150",
  type: "page-type/module",
  slug: "chat-panel",
  definition: "the panel in the chat place where Alan talks with the story's game master",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel has a row of tabs, and Assistant is the one tab in that row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Assistant tab has its own history and its own message box.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chat message sends whether or not a turn is being made.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A chat message reaches the game master as a bracketed line the action bar would send.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The history holds the messages sent on this visit and the messages still waiting.",
    },
  ],
  createdAt: "2026-10-27T18:54:57.088Z",
  updatedAt: "2026-10-27T18:54:57.088Z",
} as const satisfies Module
