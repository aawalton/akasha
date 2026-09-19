import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const damageShield = {
  id: "01a06575-9800-7503-9721-d08933d01cd2",
  type: "page-type/world-skill",
  slug: "damage-shield",
  title: "Damage Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
