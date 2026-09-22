import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingHouseList = {
  id: "01a06128-d5cd-7395-81df-8ac14a3b370b",
  type: "page-type/module",
  slug: "housing-house-list",
  definition: "which houses this account has bought, read from the game's collectibles",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A house the account has yet to buy is listed but cannot be ported to.",
    },
  ],
} as const satisfies Module
