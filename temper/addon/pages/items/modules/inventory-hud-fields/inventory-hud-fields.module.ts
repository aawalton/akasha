import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryHudFields = {
  id: "01a06258-b52c-7007-908b-f5798ab11238",
  type: "page-type/module",
  slug: "inventory-hud-fields",
  definition: "the net-worth and bag-slot fields this add-on registers on the heads-up display",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gain is in the game's succeeded text color, and a loss in its failed one.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.852Z",
  updatedAt: "2026-10-18T17:41:41.740Z",
} as const satisfies Module
