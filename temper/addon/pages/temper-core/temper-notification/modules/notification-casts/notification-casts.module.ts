import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationCasts = {
  id: "01a0605a-0516-7516-a0f3-ef7984de267b",
  type: "page-type/module",
  slug: "notification-casts",
  definition: "what a value out of the game's untyped panel tables is taken as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
  createdAt: "2026-09-02T04:21:47.414Z",
  updatedAt: "2026-09-22T13:28:06.000Z",
} as const satisfies Module
