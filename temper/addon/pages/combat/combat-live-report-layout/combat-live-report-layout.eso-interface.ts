import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatLiveReportLayout = {
  id: "01a0617f-584c-7cd2-b0e8-32c2e517c3a9",
  type: "page-type/eso-interface",
  slug: "combat-live-report-layout",
  definition: "the small window shown while a fight is on",
  markup: "xml",
  loadedAs: "TemperCombat_LiveReport.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every figure the live report shows is set as a shadowed number.",
    },
  ],
} as const satisfies EsoInterface
