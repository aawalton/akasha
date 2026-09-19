import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const palace = {
  id: "01a0657d-0286-77b8-8957-d93d63da6858",
  type: "page-type/world-skill",
  slug: "palace",
  title: "Palace",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
