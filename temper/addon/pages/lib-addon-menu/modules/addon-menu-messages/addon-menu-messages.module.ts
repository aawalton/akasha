import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuMessages = {
  id: "01a06100-0000-7000-8000-000000000005",
  type: "page-type/module",
  slug: "addon-menu-messages",
  definition: "the queued chat output and the debug logger of the library",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Messages queue until the chat system has a primary container.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every message printed to chat has a LAM2 prefix.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing LibDebugLogger yields a logger whose methods do nothing.",
    },
  ],
} as const satisfies Module
