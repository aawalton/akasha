import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatReportLayout = {
  id: "01a0617f-584e-76ce-83fb-c830e5da8925",
  type: "page-type/eso-interface",
  slug: "combat-report-layout",
  definition: "the report window shown after a fight, with its panels, lists and graph",
  markup: "xml",
  loadedAs: "TemperCombat_Report.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A status bar's outline is a thin edge rather than a panel's inset art.",
    },
  ],
  createdAt: "2026-09-02T09:42:10.766Z",
  updatedAt: "2026-10-18T19:45:44.211Z",
} as const satisfies EsoInterface
