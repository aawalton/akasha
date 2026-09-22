import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperChatMessage = {
  id: "01a0c736-fca4-7f93-97d8-93f4d98fc1b8",
  type: "page-type/domain",
  slug: "temper-chat-message",
  definition: "tagged chat messages, custom chat links, and chat restored across sessions",
  parts: [
    "module/chat-history",
    "module/chat-links",
    "module/chat-message-api",
    "module/chat-message-casts",
    "module/chat-message-constants",
    "module/chat-message-formatters",
    "module/chat-message-lifecycle",
    "module/chat-message-main",
    "module/chat-message-public-api",
    "module/chat-message-slash-command",
    "module/chat-message-strings",
    "module/chat-message-types",
    "module/chat-proxy",
    "module/chat-saved-data",
    "type-declaration/chat-message-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message is printed through the game's chat router rather than a direct chat call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tagged message has the tag of the addon that printed the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A time prefix is read from the local clock in whole seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Chat history is restored once the player has entered the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restored message keeps the timestamp the message was first stored under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another add-on reaches the chat tagging through a global rather than an import.",
    },
  ],
} as const satisfies Domain
