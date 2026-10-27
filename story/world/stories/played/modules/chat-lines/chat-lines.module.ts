import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatLines = {
  id: "01a17ecf-bd36-748c-9f18-98233f4e78a6",
  type: "page-type/module",
  slug: "chat-lines",
  definition: "the lines of a story played's chat, as written and as read back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every writer of a chat line writes it here, so every line has one shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is no message is passed over rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chat with no file reads as nothing said.",
    },
  ],
  createdAt: "2026-10-27T19:21:46.037Z",
  updatedAt: "2026-10-27T19:21:46.037Z",
} as const satisfies Module
