import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const restoreFood = {
  id: "01a0657d-02b1-73f6-bb95-005907a7c839",
  type: "world-skill",
  slug: "restore-food",
  title: "Restore Food",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
