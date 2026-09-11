import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraFireball = {
  id: "01a06575-97ee-74b5-bfb6-3f2025ab023c",
  type: "world-skill",
  slug: "aura-fireball",
  title: "Aura Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
