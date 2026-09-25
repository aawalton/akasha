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
        "Each section of the report sits on a panel, and the pages inside one are cleared.",
    },
  ],
} as const satisfies Module
