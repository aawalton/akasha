import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingSettingsMenu = {
  id: "01a06128-d5d2-78a7-baa2-c7e8199cecec",
  type: "page-type/module",
  slug: "housing-settings-menu",
  definition: "the settings panel the housing add-on registers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting is written to saved variables as the player changes the setting.",
    },
  ],
} as const satisfies Module
