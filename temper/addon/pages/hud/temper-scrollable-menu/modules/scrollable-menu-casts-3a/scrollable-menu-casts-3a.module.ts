import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuCasts3a = {
  id: "01a06275-c444-769d-a238-060e94512654",
  type: "page-type/module",
  slug: "scrollable-menu-casts-3a",
  definition:
    "the narrowing helpers for shapes named from ThisVoidArgsNever through ControlUnknownAlt",
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
      statement: "Function signatures name the receiver parameter as void or unknown.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Membership of this half is decided by the alphabetical name of the target type.",
    },
  ],
} as const satisfies Module
