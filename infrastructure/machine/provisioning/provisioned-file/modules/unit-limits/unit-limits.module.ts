import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unitLimits = {
  id: "01a0d5a8-3fc9-7d3c-81ca-b384ae28d105",
  type: "page-type/module",
  slug: "unit-limits",
  definition: "the lines a systemd unit states its processor share and memory ceilings in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line is written from the value the unit's page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the page does not state writes no line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A whole number of gigabytes is written in gigabytes, and any other in megabytes.",
    },
  ],
} as const satisfies Module
