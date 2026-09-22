import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatMessageApi = {
  id: "01a06060-0d15-7e8d-81a2-d269b361c55f",
  type: "page-type/module",
  slug: "chat-message-api",
  definition: "the library object every caller of the chat message library reaches",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting read before the saved settings load falls back to the default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Registering a custom chat link marks that link type valid for chat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A custom chat link with no reformatter is rebuilt as a plain game link.",
    },
  ],
} as const satisfies Module
