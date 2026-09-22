import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingTraderKioskInfo = {
  id: "01a06160-2a5d-76e5-bad4-aeac785cc866",
  type: "page-type/module",
  slug: "trading-trader-kiosk-info",
  definition: "what is known of the player's current trader kiosk",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Kiosk facts are read from the game rather than kept between sessions.",
    },
  ],
} as const satisfies Module
