import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneCasts = {
  id: "01a061e7-92f2-790e-b9b3-5b0d9a77cf73",
  type: "page-type/module",
  slug: "zone-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The slash-command library is reached off the global table rather than by its name.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.522Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
