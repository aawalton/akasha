import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const restoreFood = {
  id: "01a0657d-02b1-73f6-bb95-005907a7c839",
  type: "page-type/world-skill",
  slug: "restore-food",
  title: "Restore Food",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.641Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
