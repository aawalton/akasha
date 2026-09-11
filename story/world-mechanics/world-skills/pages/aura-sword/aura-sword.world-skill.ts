import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraSword = {
  id: "01a06575-97f0-78ee-bfd7-ffee618527f4",
  type: "world-skill",
  slug: "aura-sword",
  title: "Aura Sword",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
