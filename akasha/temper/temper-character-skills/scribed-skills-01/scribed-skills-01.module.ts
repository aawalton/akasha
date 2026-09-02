import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribedSkills01 = {
  id: "01a0617c-86c2-769f-b3a1-ac65b5fdbec9",
  pageTypeSlug: "module",
  slug: "scribed-skills-01",
  definition: "one run of scribed skills, in the order the whole table names them",
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
