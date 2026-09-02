import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkillOptimizer = {
  id: "01a06152-c2d3-745f-a9ce-273ae6b1e966",
  pageTypeSlug: "module",
  slug: "companion-skill-optimizer",
  definition: "candidate skill combination search producing the top ranked companion skill bars",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Buff skills are ranked from the last bar position rather than the first.",
    },
    {
      invariantKind: "constraint",
      statement: "A tank build reserves the first bar slot for a taunt skill.",
    },
    {
      invariantKind: "constraint",
      statement: "A combination carrying more than one armor skill is rejected.",
    },
    {
      invariantKind: "gap",
      statement: "A taunt counts only when its cooldown is at most sixteen seconds.",
    },
  ],
} as const satisfies Module
