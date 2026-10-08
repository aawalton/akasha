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
      statement: "A skill slot's name is read from its page; its id and place stay here.",
    },
  ],
  hashIndexed: ["COMPANION_SKILL_SLOT_DATA"],
  createdAt: "2026-09-02T07:50:47.209Z",
  updatedAt: "2026-09-26T17:03:06.000Z",
} as const satisfies Module
