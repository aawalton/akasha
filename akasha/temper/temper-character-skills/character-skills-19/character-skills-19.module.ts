import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills19 = {
  id: "01a06182-7821-78d2-b1a2-7a8a07bf141a",
  pageTypeSlug: "module",
  slug: "character-skills-19",
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
