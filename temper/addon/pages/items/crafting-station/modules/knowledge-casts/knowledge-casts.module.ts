import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeCasts = {
  id: "01a061fa-8003-7294-ab90-2fa2f73b33f0",
  type: "page-type/module",
  slug: "knowledge-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
  createdAt: "2026-09-02T11:56:41.859Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
