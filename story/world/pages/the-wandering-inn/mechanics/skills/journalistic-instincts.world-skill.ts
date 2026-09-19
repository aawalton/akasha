import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const journalisticInstincts = {
  id: "01a06575-9820-7246-b80a-939da31082da",
  type: "page-type/world-skill",
  slug: "journalistic-instincts",
  title: "Journalistic Instincts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
