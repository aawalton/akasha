import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakSettingsMenu = {
  id: "01a06115-1ad4-7da9-bc03-79782a698425",
  type: "page-type/module",
  slug: "tweak-settings-menu",
  definition: "the settings panel the interface tweaks register",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
