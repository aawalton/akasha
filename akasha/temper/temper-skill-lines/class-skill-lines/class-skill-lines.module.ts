import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const classSkillLines = {
  id: "01a0608a-c134-7c50-b351-4346bb0b63f1",
  pageTypeSlug: "module",
  slug: "class-skill-lines",
  definition: "the twenty-one class skill lines, each naming the class that holds it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
