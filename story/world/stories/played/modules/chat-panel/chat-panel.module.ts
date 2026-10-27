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
      decisionKind: "decision-kind/departure",
      statement: "The history is the story's chat file, read again each time the story is pushed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chat file is read on a timer only while the story's page is not followed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message still sending or refused is drawn after every line the chat kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line said by any seat is drawn as the game master's answer.",
    },
  ],
  createdAt: "2026-10-27T18:54:57.088Z",
  updatedAt: "2026-10-27T19:21:46.037Z",
} as const satisfies Module
