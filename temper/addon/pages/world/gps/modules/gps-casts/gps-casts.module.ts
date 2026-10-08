import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsCasts = {
  id: "01a0614d-4760-77ae-8327-bdf716931de5",
  type: "page-type/module",
  slug: "gps-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
  createdAt: "2026-09-02T08:47:29.632Z",
  updatedAt: "2026-09-22T03:58:40.000Z",
} as const satisfies Module
