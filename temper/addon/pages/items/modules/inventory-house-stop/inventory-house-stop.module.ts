import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryHouseStop = {
  id: "01a1844c-e32d-7fe9-8b5d-ca403f31bdd7",
  type: "page-type/module",
  slug: "inventory-house-stop",
  definition:
    "the houses the plan sends the logged-in character to, in order, and the work at each",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A house stop names a house and the work the plan has there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The houses to scan come first, since the vault sends nothing to an unscanned house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The storage stops come after the scans, in the order the plan's venues come.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house chest's stop is the house its location key names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The vault's stop is the house holding the most house chests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The storage work at one house is one stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each house a house rule names and no scan has recorded is a stop to scan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The houses to scan come in rule order, then in the order each chain names them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A house the carried furnishings are bound for is a stop to place, after every storage stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The houses to place in come in the order the smallest stacks reach them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the storage carrier is sent to scan a house or to place furnishings.",
    },

    {
      decisionKind: "decision-kind/gap",
      statement:
        "The furnishings the vault holds for a house are no stop, since the plan counts none.",
    },
  ],
  createdAt: "2026-10-28T20:56:33.837Z",
  updatedAt: "2026-10-28T21:51:40.159Z",
} as const satisfies Module
