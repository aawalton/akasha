import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const requiredSkillLinesFilter = {
  id: "01a06100-3bf8-70f7-9492-2892d8648322",
  pageTypeSlug: "module",
  slug: "required-skill-lines-filter",
  definition: "the Required Skill Lines condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `requiredSkillLines` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule whose action is other than `stock` is offered no Required Skill Lines condition.",
    },
  ],
} as const satisfies Module
