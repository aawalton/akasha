import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameNamesFr = {
  id: "01a061d6-3e28-728d-b0db-98bd68c7fcb6",
  type: "page-type/module",
  slug: "sets-drop-name-names-fr",
  definition: "the French name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.704Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
