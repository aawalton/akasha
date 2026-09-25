import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatUiReportState = {
  id: "01a0d9f0-6e11-70d9-8b33-3852f5b109c7",
  type: "page-type/module",
  slug: "combat-ui-report-state",
  definition: "what the report and its fight lists show with no fight, or one being worked out",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "With no fight recorded, the report's sections give way to a line saying so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight still being worked out shows the loading state in the sections' place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A section gives way by turning clear, so the tabs choosing sections keep their say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each fight list shows loading while its rows are made, and says when it has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The fight list's own loading label is kept hidden in favour of window-data-state.",
    },
  ],
} as const satisfies Module
