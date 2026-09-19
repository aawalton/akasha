import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lootWeighsNothing = {
  id: "01a0657d-0241-7022-8c0f-3f5d6fa95295",
  type: "page-type/world-skill",
  slug: "loot-weighs-nothing",
  title: "Loot Weighs Nothing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
