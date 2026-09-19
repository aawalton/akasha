import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraSword = {
  id: "01a06575-97f0-78ee-bfd7-ffee618527f4",
  type: "page-type/world-skill",
  slug: "aura-sword",
  title: "Aura Sword",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
