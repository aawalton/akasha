import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribedSkillTemplate = {
  id: "01a0617c-86c1-77b2-9e1c-f729dd5bce09",
  pageTypeSlug: "module",
  slug: "scribed-skill-template",
  definition: "the shape a scribed skill carries beyond an ordinary skill row",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A scribed skill names one grimoire and one focus script.",
    },
  ],
} as const satisfies Module
