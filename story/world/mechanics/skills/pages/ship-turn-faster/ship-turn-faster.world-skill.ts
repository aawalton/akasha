import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipTurnFaster = {
  id: "01a0657d-02c1-7a2f-8561-cd9ce4ac5780",
  type: "page-type/world-skill",
  slug: "ship-turn-faster",
  title: "Ship: Turn Faster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
