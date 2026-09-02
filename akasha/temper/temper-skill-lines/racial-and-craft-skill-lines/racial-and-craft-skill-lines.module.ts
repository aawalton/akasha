import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const racialAndCraftSkillLines = {
  id: "01a0608a-c134-7a46-8ccf-242d3505a448",
  pageTypeSlug: "module",
  slug: "racial-and-craft-skill-lines",
  definition: "the ten racial skill lines and the seven craft skill lines",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
