import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const clearMinds = {
  id: "01a06575-97fb-7b5f-88a2-51bdba6b10c0",
  type: "page-type/world-skill",
  slug: "clear-minds",
  title: "Clear Minds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
