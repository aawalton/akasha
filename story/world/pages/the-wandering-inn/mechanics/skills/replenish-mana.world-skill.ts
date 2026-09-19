import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const replenishMana = {
  id: "01a0657d-02b0-740b-a309-a801fe1cf8b3",
  type: "page-type/world-skill",
  slug: "replenish-mana",
  title: "Replenish Mana",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
