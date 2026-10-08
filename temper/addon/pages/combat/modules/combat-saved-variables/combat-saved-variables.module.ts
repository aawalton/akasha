import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatSavedVariables = {
  id: "01a0617f-584f-7785-9ec6-fb2619c4e668",
  type: "page-type/module",
  slug: "combat-saved-variables",
  definition: "every setting this add-on remembers between sessions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The live report panel is shown only where its setting asks, and the setting starts off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panel's setting is a key of its own, so a player who had the panel on before starts with it off.",
    },
  ],
  updatedAt: "2026-10-08T15:14:06.756Z",
} as const satisfies Module
