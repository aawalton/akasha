import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaPool = {
  id: "01a0657d-0242-7395-adf8-9f4964bfd0f4",
  type: "page-type/world-skill",
  slug: "mana-pool",
  title: "Mana Pool",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
