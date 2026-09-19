import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ignorePain = {
  id: "01a06575-981c-7da5-aa21-232210507b59",
  type: "page-type/world-skill",
  slug: "ignore-pain",
  title: "Ignore Pain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
