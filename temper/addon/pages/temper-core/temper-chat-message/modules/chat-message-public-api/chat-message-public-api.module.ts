import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatMessagePublicApi = {
  id: "01a06060-0d18-7688-8eab-91ba2a064865",
  type: "page-type/module",
  slug: "chat-message-public-api",
  definition: "the name the chat message library puts in the game's global table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading the library a second time raises an error.",
    },
  ],
  createdAt: "2026-09-02T04:28:22.680Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
