import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deathStare = {
  id: "01a06575-9802-7490-855f-b4a5f5459204",
  type: "page-type/world-skill",
  slug: "death-stare",
  title: "Death Stare",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
