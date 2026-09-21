import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuCasts2c = {
  id: "01a0c509-af1c-7c61-9f5b-08859cf7da2b",
  type: "page-type/module",
  slug: "scrollable-menu-casts-2c",
  definition: "the narrowing helpers for shapes named from RunItemCallback through StringUndefined",
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
      decisionKind: "decision-kind/departure",
      statement: "Method-bearing shapes are spelled out inline as structural object types.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Membership of this part is decided by the alphabetical name of the target type.",
    },
  ],
} as const satisfies Module
