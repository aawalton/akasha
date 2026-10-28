import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryHouseCircuit = {
  id: "01a1847f-567f-7ed3-8260-22731c5d6bb7",
  type: "page-type/module",
  slug: "inventory-house-circuit",
  definition:
    "the next step of a circuit through the house stops, from the stops left and the ports made",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A circuit ports on to each house to scan or place in, one after another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A circuit ends at a storage stop, since the chests and the vault are opened by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A circuit begun in a storage stop's house passes every storage stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A circuit's next stop is the first at a house other than the one the character is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A circuit ends where no house stop is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house the circuit already ported to coming up again stops the circuit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A port is counted against the ports made and the stops left before the next storage stop.",
    },
  ],
  createdAt: "2026-10-28T21:51:40.159Z",
  updatedAt: "2026-10-28T21:51:40.159Z",
} as const satisfies Module
