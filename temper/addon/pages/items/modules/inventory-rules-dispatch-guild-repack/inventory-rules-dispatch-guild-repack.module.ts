import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchGuildRepack = {
  id: "01a06258-b531-77ae-a941-9be7cf097d72",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-guild-repack",
  definition: "repacking the guild bank so partial stacks are merged",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the storage carrier repacks a guild bank.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.857Z",
  updatedAt: "2026-11-01T19:58:50.831Z",
} as const satisfies Module
