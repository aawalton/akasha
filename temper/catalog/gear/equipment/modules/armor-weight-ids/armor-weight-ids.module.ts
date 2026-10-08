import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorWeightIds = {
  id: "01a060f0-3eac-71f4-ab24-ac7b5ad15139",
  type: "page-type/module",
  slug: "armor-weight-ids",
  definition: "the weight classes for a piece of body armor or a shield",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This module names the armor weights without naming any order among the armor weights.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are the weight pages' slugs, as the gear kind ids table holds them.",
    },
  ],
  createdAt: "2026-09-02T07:05:52.556Z",
  updatedAt: "2026-09-27T02:49:23.000Z",
} as const satisfies Module
