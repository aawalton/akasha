import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionArmorWeights = {
  id: "01a06108-0763-7147-bd41-21baa914acb5",
  type: "page-type/module",
  slug: "companion-armor-weights",
  definition: "the weight classes of a companion's body armor",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An armor weight's name, order and armor type are read from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An armor weight's id stays in code, because rules name weights by id.",
    },
  ],
  createdAt: "2026-09-02T07:31:51.267Z",
  updatedAt: "2026-09-26T17:26:37.000Z",
} as const satisfies Module
