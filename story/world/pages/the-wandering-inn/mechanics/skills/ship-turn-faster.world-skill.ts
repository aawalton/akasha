import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipTurnFaster = {
  id: "01a0657d-02c1-7a2f-8561-cd9ce4ac5780",
  type: "page-type/world-skill",
  slug: "ship-turn-faster",
  title: "Ship: Turn Faster",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.657Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
