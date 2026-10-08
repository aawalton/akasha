import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingBuildMyHousesTab = {
  id: "01a06128-d5c5-728f-acef-bd15630d6f1b",
  type: "page-type/module",
  slug: "housing-build-my-houses-tab",
  definition: "building the controls of the my-houses tab",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Controls are built once and hidden rather than made again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tab wraps the owned-houses update once, so every caller shows when no house is owned.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.253Z",
  updatedAt: "2026-09-25T19:34:26.000Z",
} as const satisfies Module
