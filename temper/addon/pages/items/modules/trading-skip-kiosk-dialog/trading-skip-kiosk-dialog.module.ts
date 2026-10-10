import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingSkipKioskDialog = {
  id: "01a06160-2a5d-7701-bfcb-d89a2bf8ddf3",
  type: "page-type/module",
  slug: "trading-skip-kiosk-dialog",
  definition: "passing the trader kiosk confirmation a player would otherwise answer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the confirmation is passed and the purchase itself is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A menu offering the bank or the guild bank is left to the player.",
    },
  ],
  createdAt: "2026-09-02T09:08:07.389Z",
  updatedAt: "2026-10-10T14:22:00.441Z",
} as const satisfies Module
