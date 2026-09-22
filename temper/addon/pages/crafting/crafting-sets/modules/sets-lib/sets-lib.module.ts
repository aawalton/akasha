import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLib = {
  id: "01a0c67e-6762-70ba-8fef-fc508116a25d",
  type: "page-type/module",
  slug: "sets-lib",
  definition: "the table this library hangs every value and function it answers with on",
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
  ],
} as const satisfies Module
