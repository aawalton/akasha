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
      statement: "A message lands as a line the pages append to the chat, and reads nothing first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The first append states the chat on the story's page, since an unstated file is never read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is stated in a write of its own, after the line has landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message's line is appended under an id chosen once, for the line and its appends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the chat held already, from an earlier try, is answered as kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other write landing no commit is no append, and is answered as not kept.",
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
  updatedAt: "2026-10-27T22:43:01.523Z",
} as const satisfies Module
