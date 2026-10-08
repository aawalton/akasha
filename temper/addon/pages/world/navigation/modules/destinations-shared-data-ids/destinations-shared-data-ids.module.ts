import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSharedDataIds = {
  id: "01a06269-29ee-7dd4-9b42-a7cf0a83ea00",
  type: "page-type/module",
  slug: "destinations-shared-data-ids",
  definition: "the achievement and collectible ids the destination rows name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.318Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
