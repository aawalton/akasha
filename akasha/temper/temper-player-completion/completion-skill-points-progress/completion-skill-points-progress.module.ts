import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionSkillPointsProgress = {
  id: "01a06121-f0d5-7142-b383-42a7e23ca0c3",
  pageTypeSlug: "module",
  slug: "completion-skill-points-progress",
  definition: "every skill point each character has earned, counted against every source",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character with no skill points counted still shows every source at nothing.",
    },
  ],
} as const satisfies Module
