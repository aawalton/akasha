import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const combatLiveReportLayout = {
  id: "01a0617f-584c-7cd2-b0e8-32c2e517c3a9",
  pageTypeSlug: "eso-interface",
  slug: "combat-live-report-layout",
  definition: "the small window shown while a fight is on",
  markup: "xml",
  loadedAs: "TemperCombat_LiveReport.xml",
} as const satisfies EsoInterface
