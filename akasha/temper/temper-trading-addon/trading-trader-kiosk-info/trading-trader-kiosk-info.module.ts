import type { Module } from "@akasha/code-system/module"

export const tradingTraderKioskInfo = {
  id: "01a06160-2a5d-76e5-bad4-aeac785cc866",
  pageTypeSlug: "module",
  slug: "trading-trader-kiosk-info",
  definition: "what is known of the trader kiosk a player is at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Kiosk facts are read from the game rather than kept between sessions.",
    },
  ],
} as const satisfies Module
