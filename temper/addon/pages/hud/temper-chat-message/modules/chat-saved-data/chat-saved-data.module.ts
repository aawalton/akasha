import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chatSavedData = {
  id: "01a06060-0d15-7829-a88a-51a1d1860e21",
  type: "page-type/module",
  slug: "chat-saved-data",
  definition: "how a value too long for one saved variable string is split and rejoined",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A string over the saved variable limit is split into chunks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chunked string is rejoined as the string is read back.",
    },
  ],
} as const satisfies Module
