import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills84 = {
  id: "01a06183-fa45-7015-84c9-8c0af7486f43",
  pageTypeSlug: "module",
  slug: "character-skills-84",
  definition: "one run of Elder Scrolls Online skills, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "These entries are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
