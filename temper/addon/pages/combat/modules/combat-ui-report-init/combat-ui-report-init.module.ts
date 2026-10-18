import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatUiReportInit = {
  id: "01a0617f-585a-7e18-98ba-ff40fe05a760",
  type: "page-type/module",
  slug: "combat-ui-report-init",
  definition: "building the report window the first time it is opened",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The report window sits on the game's default backdrop, in Combat Metrics' layout.",
    },
  ],
  createdAt: "2026-09-02T09:42:10.778Z",
  updatedAt: "2026-10-18T17:43:08.318Z",
} as const satisfies Module
