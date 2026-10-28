import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryFurnishingScanner = {
  id: "01a06258-b52c-715f-b459-e0ac91ba6964",
  type: "page-type/module",
  slug: "inventory-furnishing-scanner",
  definition: "reading the furnishings placed in a house into the saved database",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A house is scanned on entry only where the character entering owns it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scan records the house's ids and, for each limit type, its limit and count placed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A furnishing placed or removed records those counts again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A placed collectible counts against its collectible's limit type, an item its link's.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.852Z",
  updatedAt: "2026-10-28T19:37:04.597Z",
} as const satisfies Module
