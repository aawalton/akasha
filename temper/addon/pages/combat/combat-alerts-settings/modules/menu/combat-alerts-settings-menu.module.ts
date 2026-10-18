import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatAlertsSettingsMenu = {
  id: "01a0deb0-4738-7c8d-812a-62ceba116a7b",
  type: "page-type/module",
  slug: "combat-alerts-settings-menu",
  definition: "the combat alerts settings panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panel is named in plain text as Temper's other panels are, with no author line.",
    },
  ],
  createdAt: "2026-09-26T17:08:09.656Z",
  updatedAt: "2026-10-18T19:47:54.825Z",
} as const satisfies Module
