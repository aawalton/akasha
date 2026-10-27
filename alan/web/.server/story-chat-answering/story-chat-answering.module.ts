import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storyChatAnswering = {
  id: "01a17ecf-bd36-7b35-8cfc-6bc1dc046199",
  type: "page-type/module",
  slug: "story-chat-answering",
  definition: "what a route answers when Alan says a message in a story played's chat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The test proving this code sits beside the route serving this code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is refused to a caller the action bar would refuse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is appended to the story's chat before the game master is told of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The append reads the chat at a commit and writes it whole, read at that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An append another write beat is read and tried again, five times at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An append states the chat on the story's page, since an unstated file is never read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master is told by a message from the chat's own sender, as typed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is sent whether or not a turn is being made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message kept that reached no game master is answered as kept and not sent.",
    },
  ],
  createdAt: "2026-10-27T19:21:46.037Z",
  updatedAt: "2026-10-27T19:55:45.778Z",
} as const satisfies Module
