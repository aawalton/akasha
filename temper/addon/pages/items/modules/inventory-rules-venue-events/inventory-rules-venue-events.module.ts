import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesVenueEvents = {
  id: "01a06258-b533-7f78-940d-85d72d5b088f",
  type: "page-type/module",
  slug: "inventory-rules-venue-events",
  definition: "the events that fire a dispatch when a bank, store, station or mailbox opens",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A closing store, fence, crafting station, guild store or mailbox settles the pending actions.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.859Z",
  updatedAt: "2026-10-10T14:08:31.826Z",
} as const satisfies Module
