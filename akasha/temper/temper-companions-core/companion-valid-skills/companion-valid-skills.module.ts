import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionValidSkills = {
  id: "01a06152-c2d9-7726-830c-2e1d67f493b4",
  pageTypeSlug: "module",
  slug: "companion-valid-skills",
  definition: "the set of skill ids a companion build may still slot",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A skill already on the skill bar is excluded.",
    },
    {
      invariantKind: "constraint",
      statement: "Armor skills match the skill line named for the role armor weight.",
    },
    {
      invariantKind: "departure",
      statement: "Guild skill lines pass without any further check.",
    },
  ],
} as const satisfies Module
