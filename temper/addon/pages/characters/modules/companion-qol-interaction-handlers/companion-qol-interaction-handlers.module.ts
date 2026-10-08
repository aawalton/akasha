import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolInteractionHandlers = {
  id: "01a0611d-84c8-77bb-90ec-9585304e04c6",
  type: "page-type/module",
  slug: "companion-qol-interaction-handlers",
  definition: "the game events that dismiss and resummon a companion around an interaction",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Resummoning after fishing and after crouching each wait a delay a player sets.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.624Z",
  updatedAt: "2026-09-22T01:32:08.000Z",
} as const satisfies Module
