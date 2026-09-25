import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatReportType = {
  id: "01a0d916-4e00-78d0-9f79-d16bd8db48b2",
  type: "page-type/module",
  slug: "combat-report-type",
  definition: "the fonts the combat report sets its text in, taken from the web's type scale",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text the report sets bold is a heading in Geist at 500.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other text in the report is Geist at 400.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report's small, standard and title sizes are 12, 14 and 18.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report's own size setting scales these sizes as it scaled the game's.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The live report shares the report's templates and keeps the game's fonts.",
    },
  ],
} as const satisfies Module
