import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const worldAndGuildSkillLines = {
  id: "01a0608a-c137-75af-827c-6304cca38915",
  pageTypeSlug: "module",
  slug: "world-and-guild-skill-lines",
  definition: "the six world skill lines and the six guild skill lines",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
