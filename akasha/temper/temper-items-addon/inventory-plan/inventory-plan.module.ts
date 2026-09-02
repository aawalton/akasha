import type { Module } from "@akasha/code-system/module"

export const inventoryPlan = {
  id: "01a06258-b52e-7092-b8df-b96f86d39d15",
  pageTypeSlug: "module",
  slug: "inventory-plan",
  definition:
    "the pending actions grouped by the venue they happen at, and the chat command that prints them",
  code: "ts",
} as const satisfies Module
