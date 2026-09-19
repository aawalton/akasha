import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserWisdom = {
  id: "01a06575-9823-706d-85ab-f13ea68e4959",
  type: "page-type/world-skill",
  slug: "lesser-wisdom",
  title: "Lesser Wisdom",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
