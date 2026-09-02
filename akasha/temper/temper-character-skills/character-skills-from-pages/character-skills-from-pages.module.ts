import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkillsFromPages = {
  id: "01a06187-b3a0-7150-bb13-34820d779cb1",
  pageTypeSlug: "module",
  slug: "character-skills-from-pages",
  definition: "every Elder Scrolls Online skill the catalog pages carry",
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
