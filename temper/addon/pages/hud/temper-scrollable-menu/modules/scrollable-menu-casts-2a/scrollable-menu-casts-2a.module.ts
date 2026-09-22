import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuCasts2a = {
  id: "01a06275-c444-7b0e-8cc1-e4c4d6decd30",
  type: "page-type/module",
  slug: "scrollable-menu-casts-2a",
  definition: "the narrowing helpers for shapes named from HiddenForReasons through M_submenu",
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
      statement: "Near-identical shapes are distinguished by a trailing digit on the type name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Membership of this half is decided by the alphabetical name of the target type.",
    },
  ],
} as const satisfies Module
