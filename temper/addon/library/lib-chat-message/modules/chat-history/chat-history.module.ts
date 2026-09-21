import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatHistory = {
  id: "01a06060-0d16-7573-9d55-36758b6276fa",
  type: "page-type/module",
  slug: "chat-history",
  definition: "the chat events this library keeps for a later session to replay",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A timestamp is counted in whole seconds of local time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "History over its maximum length is trimmed from the oldest entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A replayed event is stored no second time.",
    },
  ],
} as const satisfies Module
