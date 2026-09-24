import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSupportBaseline = {
  id: "01a06152-c2d6-735f-b4cd-3686f61269aa",
  type: "page-type/module",
  slug: "companion-support-baseline",
  definition: "reference baseline of buff uptimes and damage multipliers for a companion build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The baseline computation passes EMPTY_BASELINE into the stats calculator.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Light attack is excluded from the per-skill buff scan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing health maximum metric is refused, naming that metric.",
    },
  ],
} as const satisfies Module
