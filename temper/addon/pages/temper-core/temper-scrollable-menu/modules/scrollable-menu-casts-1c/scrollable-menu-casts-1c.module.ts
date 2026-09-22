import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuCasts1c = {
  id: "01a0c508-3bf4-754f-bc51-3777ce7a959c",
  type: "page-type/module",
  slug: "scrollable-menu-casts-1c",
  definition: "the narrowing helpers for shapes named from GetAnimation through GetValue",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each helper performs a bare TypeScript cast and returns the value unchanged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The cast is not guarded by any runtime check.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Membership of this part is decided by the alphabetical name of the target type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Method-bearing shapes are spelled out inline as structural object types.",
    },
  ],
} as const satisfies Module
