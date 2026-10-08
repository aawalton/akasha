import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatMessageConstants = {
  id: "01a06060-0d15-7df5-abbc-1aabd8bc7f85",
  type: "page-type/module",
  slug: "chat-message-constants",
  definition: "the fixed values building a chat message",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A time format is named by a short label a player types.",
    },
  ],
  createdAt: "2026-09-02T04:28:22.677Z",
  updatedAt: "2026-09-22T13:45:15.000Z",
} as const satisfies Module
