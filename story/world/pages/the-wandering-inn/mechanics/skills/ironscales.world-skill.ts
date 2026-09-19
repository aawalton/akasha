import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ironscales = {
  id: "01a06575-9820-7a6c-8304-4c524ab19a47",
  type: "page-type/world-skill",
  slug: "ironscales",
  title: "Ironscales",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
