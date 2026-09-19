import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalEnemyVampires = {
  id: "01a0657d-0271-7083-b0ff-08ab70c2450d",
  type: "page-type/world-skill",
  slug: "natural-enemy-vampires",
  title: "Natural Enemy: Vampires",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
