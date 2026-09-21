import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibChatMessage = {
  id: "01a06060-0d13-746b-9617-c8f4b7d288ce",
  type: "page-type/eso-addon",
  slug: "temper-lib-chat-message",
  definition: "an addon library printing tagged chat messages and restoring chat across sessions",

  addonManifest: "json",
  bundleEntry: "module/chat-message-main",
  parts: [
    "module/chat-history",
    "module/chat-links",
    "module/chat-message-casts",
    "module/chat-message-constants",
    "module/chat-message-formatters",
    "module/chat-message-lib",
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
      decisionKind: "decision-kind/constraint",
      statement: "A caller reaches this library through a game global rather than an import.",
    },
  ],
} as const satisfies EsoAddon
