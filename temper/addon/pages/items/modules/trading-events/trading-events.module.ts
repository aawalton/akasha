import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingEvents = {
  id: "01a06160-2a5a-796d-b687-09aeb649b743",
  type: "page-type/module",
  slug: "trading-events",
  definition: "the game events the listings add-on watches",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every listener is named after the add-on so a reload can drop those listeners.",
    },
  ],
} as const satisfies Module
