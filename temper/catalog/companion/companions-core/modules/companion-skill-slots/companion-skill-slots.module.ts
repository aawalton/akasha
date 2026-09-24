import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillSlots = {
  id: "01a06119-5ca9-7ca6-b630-d90e7f111648",
  type: "page-type/module",
  slug: "companion-skill-slots",
  definition: "the six skill places on a companion's skill bar",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
  hashIndexed: ["COMPANION_SKILL_SLOT_DATA"],
} as const satisfies Module
