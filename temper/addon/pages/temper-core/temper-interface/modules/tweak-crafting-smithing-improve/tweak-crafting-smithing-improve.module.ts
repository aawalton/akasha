import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakCraftingSmithingImprove = {
  id: "01a06115-1ac7-7496-8d0d-86f1548469eb",
  type: "page-type/module",
  slug: "tweak-crafting-smithing-improve",
  definition: "the smithing improvement panel the interface tweaks change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
  createdAt: "2026-09-02T07:46:08.199Z",
  updatedAt: "2026-09-22T06:38:56.000Z",
} as const satisfies Module
