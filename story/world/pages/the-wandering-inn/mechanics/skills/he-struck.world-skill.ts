import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heStruck = {
  id: "01a06575-9818-76fb-988f-2aed1fdfbf02",
  type: "page-type/world-skill",
  slug: "he-struck",
  title: "He Struck",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
