import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakCraftingSmithing = {
  id: "01a06115-1ac7-7093-bdbd-2f2d354a8b32",
  type: "page-type/module",
  slug: "tweak-crafting-smithing",
  definition: "the smithing creation panel the interface tweaks change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard stands behind the guards here.",
    },
  ],
} as const satisfies Module
