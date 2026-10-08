import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const applyHealingGel = {
  id: "01a06575-97eb-7916-b735-da30dd9e7865",
  type: "page-type/world-skill",
  slug: "apply-healing-gel",
  title: "Apply Healing Gel",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.555Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
