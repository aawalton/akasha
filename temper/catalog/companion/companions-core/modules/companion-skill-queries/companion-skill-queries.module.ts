import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillQueries = {
  id: "01a0cac5-6a45-7b66-ab20-716c0b96dad5",
  type: "page-type/module",
  slug: "companion-skill-queries",
  definition: "which companion skills a companion can slot, and which one is slotted by default",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill stating no companion is a skill every companion can slot.",
    },
  ],
  createdAt: "2026-09-22T20:18:50.565Z",
  updatedAt: "2026-09-22T20:31:45.000Z",
} as const satisfies Module
