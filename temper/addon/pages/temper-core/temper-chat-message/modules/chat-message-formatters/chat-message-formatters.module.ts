import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatMessageFormatters = {
  id: "01a06060-0d17-74d0-ba57-905b629170b0",
  type: "page-type/module",
  slug: "chat-message-formatters",
  definition: "the game's chat formatters wrapped so a tag and a time prefix are added",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrapper calls the formatter the game registered for the same event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wrapped formatter table is in place only while the game formats a message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An event is stored in history before the event is formatted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An event with no registered formatter raises an error.",
    },
  ],
  createdAt: "2026-09-02T04:28:22.679Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
