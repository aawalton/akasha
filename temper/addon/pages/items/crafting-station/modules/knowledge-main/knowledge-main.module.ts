import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeMain = {
  id: "01a0622b-dc5b-7521-9cc9-030f60f5f84e",
  type: "page-type/module",
  slug: "knowledge-main",
  definition: "the wiring the library does as the game loads it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The order these modules are loaded in is the order upstream loads those modules.",
    },
  ],
  createdAt: "2026-09-02T12:50:36.763Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
