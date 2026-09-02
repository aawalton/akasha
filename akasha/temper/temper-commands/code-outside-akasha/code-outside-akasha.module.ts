import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const codeOutsideAkasha = {
  id: "01a060ed-1848-75df-a934-145b80b41e6e",
  pageTypeSlug: "module",
  slug: "code-outside-akasha",
  definition:
    "the refusal a temper command answers while the code that command calls is outside akasha",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal for want of code names the command that answered.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for want of code says which code is outside akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The inventory rules code is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The reader of the addon's saved variables is in akasha.",
    },
  ],
} as const satisfies Module
