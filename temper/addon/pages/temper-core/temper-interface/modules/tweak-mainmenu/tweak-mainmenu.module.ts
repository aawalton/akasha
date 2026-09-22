import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakMainmenu = {
  id: "01a06115-1ace-7314-97ba-9bfe3573227e",
  type: "page-type/module",
  slug: "tweak-mainmenu",
  definition: "the main menu rows the interface tweaks change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
