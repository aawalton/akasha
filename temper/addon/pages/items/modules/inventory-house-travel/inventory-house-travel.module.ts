import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryHouseTravel = {
  id: "01a1844f-f022-7c74-86fc-4a84899fcc2c",
  type: "page-type/module",
  slug: "inventory-house-travel",
  definition: "the port to the next house the inventory plan sends the logged-in character to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One key and one chat command port to the next house stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A port lands inside the house, through the port `temper-housing` gives an owned house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No port is asked for in combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house the account does not own is no stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house counts as scanned once the addon's own saved database holds its house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house scanned on entering is known to the next press, before any save.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each port says one chat line naming the house and the work there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan with no house stop left says so and ports nowhere.",
    },
  ],
  createdAt: "2026-10-28T20:59:53.762Z",
  updatedAt: "2026-10-28T21:34:16.134Z",
} as const satisfies Module
