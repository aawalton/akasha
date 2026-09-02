import type { Module } from "@akasha/code-system/module"

export const tradingSkipKioskDialog = {
  id: "01a06160-2a5d-7701-bfcb-d89a2bf8ddf3",
  pageTypeSlug: "module",
  slug: "trading-skip-kiosk-dialog",
  definition: "passing the trader kiosk confirmation a player would otherwise answer",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the confirmation is passed and the purchase itself is left alone.",
    },
  ],
} as const satisfies Module
