import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const vengeanceSkillLines = {
  id: "01a0608a-c136-7ef2-9555-b1cb126af58b",
  pageTypeSlug: "module",
  slug: "vengeance-skill-lines",
  definition: "the thirty-two vengeance skill lines the alliance war grants",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
