import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const clearPosition = {
  id: "01a06575-97fb-7d6e-8b35-f0f6e76c9a71",
  type: "page-type/world-skill",
  slug: "clear-position",
  title: "Clear Position",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
