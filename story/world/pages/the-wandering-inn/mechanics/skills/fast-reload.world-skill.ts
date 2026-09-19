import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastReload = {
  id: "01a06575-980b-70ce-b7f5-ee4f78036de8",
  type: "page-type/world-skill",
  slug: "fast-reload",
  title: "Fast Reload",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
