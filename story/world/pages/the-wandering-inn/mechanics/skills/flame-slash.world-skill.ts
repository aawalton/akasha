import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flameSlash = {
  id: "01a06575-980d-7daf-aa1d-c1761c81acc1",
  type: "page-type/world-skill",
  slug: "flame-slash",
  title: "Flame Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
