import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribedSkills = {
  id: "01a0617c-86c3-714d-94b6-7c2e12d57a1a",
  pageTypeSlug: "module",
  slug: "scribed-skills",
  definition: "every scribed skill a grimoire and a focus script combine into",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "An entry's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place breaks every build hash saved.",
    },
    {
      invariantKind: "departure",
      statement: "This table is divided across runs.",
    },
    {
      invariantKind: "constraint",
      statement: "No akasha file passes fifteen thousand bytes.",
    },
  ],
} as const satisfies Module
