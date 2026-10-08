import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingSkipKioskDialog = {
  id: "01a06160-2a5d-7701-bfcb-d89a2bf8ddf3",
  type: "page-type/module",
  slug: "trading-skip-kiosk-dialog",
  definition: "passing the trader kiosk confirmation a player would otherwise answer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the confirmation is passed and the purchase itself is left alone.",
    },
  ],
  createdAt: "2026-09-02T09:08:07.389Z",
  updatedAt: "2026-09-22T02:36:59.000Z",
} as const satisfies Module
