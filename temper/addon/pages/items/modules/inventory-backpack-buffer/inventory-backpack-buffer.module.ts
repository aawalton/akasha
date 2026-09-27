import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBackpackBuffer = {
  id: "01a06258-b526-7d25-ae50-a9ad55256535",
  type: "page-type/module",
  slug: "inventory-backpack-buffer",
  definition: "how many backpack slots are kept free, and whether there is room above that buffer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Opening a container counts the slot the container empties against the slots its loot takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An open whose loot takes no more slots than it empties needs no room above the buffer.",
    },
  ],
} as const satisfies Module
