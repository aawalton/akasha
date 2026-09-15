import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const giantSHammer = {
  id: "01a06575-9814-7052-a777-a26a0083dea5",
  type: "world-skill",
  slug: "giant-s-hammer",
  title: "Giant’s Hammer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
