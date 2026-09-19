import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const trueDamage = {
  id: "01a0657d-0317-7cab-b349-fe21ea938b44",
  type: "page-type/world-skill",
  slug: "true-damage",
  title: "True Damage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
