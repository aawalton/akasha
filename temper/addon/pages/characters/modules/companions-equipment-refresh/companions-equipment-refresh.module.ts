import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsEquipmentRefresh = {
  id: "01a0611d-84d7-7825-a380-e661d8b35a05",
  type: "page-type/module",
  slug: "companions-equipment-refresh",
  definition: "filling the companion equipment panel from live gear or from a saved build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Live gear is read where the chosen companion is summoned and saved gear otherwise.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.639Z",
  updatedAt: "2026-09-22T01:32:08.000Z",
} as const satisfies Module
