import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatMessageMain = {
  id: "01a06060-0d18-71c4-bf35-67299b7e568b",
  type: "page-type/module",
  slug: "chat-message-main",
  definition: "the chat message library's install order for its parts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The public global is put in place before the formatters install.",
    },
  ],
  createdAt: "2026-09-02T04:28:22.680Z",
  updatedAt: "2026-09-22T13:48:38.000Z",
} as const satisfies Module
