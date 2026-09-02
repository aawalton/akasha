import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const findSkillById = {
  id: "01a06187-b3a3-7d2a-b33f-3befa93b8a07",
  pageTypeSlug: "module",
  slug: "find-skill-by-id",
  definition:
    "the skill an id names, looked for among the ordinary skills and then the scribed ones",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The empty slot sentinel answers with no skill.",
    },
  ],
} as const satisfies Module
