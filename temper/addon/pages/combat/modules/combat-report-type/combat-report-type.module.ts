import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatReportType = {
  id: "01a0d916-4e00-78d0-9f79-d16bd8db48b2",
  type: "page-type/module",
  slug: "combat-report-type",
  definition: "the font the combat report sets the text it sizes at runtime in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "That text is the game's medium font at 15, scaled by the report's own scale.",
    },
  ],
  createdAt: "2026-09-25T15:01:52.768Z",
  updatedAt: "2026-09-26T15:48:51.000Z",
} as const satisfies Module
