import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkillSlots = {
  id: "01a06119-5ca9-7ca6-b630-d90e7f111648",
  pageTypeSlug: "module",
  slug: "companion-skill-slots",
  definition: "the six places a companion's skill bar holds a skill in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
