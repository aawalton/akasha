import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLib = {
  id: "01a0c67e-6762-70ba-8fef-fc508116a25d",
  type: "page-type/module",
  slug: "sets-lib",
  definition: "the table holding every value and function this library answers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every module of this library reaches that table by importing it from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is empty here and is filled by the modules importing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The table is typed whole where it is made, before the modules that fill it have run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The markup reaches that table as the global TemperItemsCraftingSets, which this sets.",
    },
  ],
} as const satisfies Module
