import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortKeyReading = {
  id: "01a11ca1-5fc9-7cea-a2cf-6749be4df1b6",
  type: "page-type/module",
  slug: "quest-port-key-reading",
  definition: "the T key's owners the world add-on wrote down, read back as lines",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A record shows the scene, the active layers and the action T reaches in each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record shows every action bound to T and every key the next-quest move has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part the game left unread says so rather than reading as empty.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or calls the game.",
    },
  ],
  createdAt: "2026-10-08T17:48:20.297Z",
  updatedAt: "2026-10-08T17:48:20.297Z",
} as const satisfies Module
