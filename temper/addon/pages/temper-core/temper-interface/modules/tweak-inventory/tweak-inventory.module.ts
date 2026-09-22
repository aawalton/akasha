import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakInventory = {
  id: "01a06115-1aca-79a6-bd65-384d31995db8",
  type: "page-type/module",
  slug: "tweak-inventory",
  definition: "the inventory window behaviour the interface tweaks change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
