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
  createdAt: "2026-09-02T07:46:08.212Z",
  updatedAt: "2026-09-22T06:38:56.000Z",
} as const satisfies Module
