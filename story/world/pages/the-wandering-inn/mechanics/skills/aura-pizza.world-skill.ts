import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraPizza = {
  id: "01a06575-97f0-79a5-987e-4203df171a30",
  type: "page-type/world-skill",
  slug: "aura-pizza",
  title: "Aura Pizza",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
