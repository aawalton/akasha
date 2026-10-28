import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryHouseTravel = {
  id: "01a1844f-f022-7c74-86fc-4a84899fcc2c",
  type: "page-type/module",
  slug: "inventory-house-travel",
  definition: "the ports along the houses the inventory plan sends the logged-in character to",
  code: "ts",
  parts: ["module/inventory-house-circuit"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One key and one chat command start a circuit, and a press during it cancels it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A circuit ports on only once placing and the paced storage moves have ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A circuit goes on after the loading screen ends in the house it ported to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A circuit waits out combat and goes on once combat ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A port that lands elsewhere, or nowhere within 90 seconds, stops the circuit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the game guards house ports, each press ports once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A circuit's storage stop gets a port and ends the circuit there.",
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
      decisionKind: "decision-kind/gap",
      statement: "Nothing tells the circuit the game refused a port, so it waits the 90 seconds.",
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
      statement: "Each port says one chat line with its count, the house and the work there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan with no house stop left says so and ports nowhere.",
    },
  ],
  createdAt: "2026-10-28T20:59:53.762Z",
  updatedAt: "2026-10-28T21:51:40.159Z",
} as const satisfies Module
