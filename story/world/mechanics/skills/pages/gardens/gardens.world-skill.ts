import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gardens = {
  id: "01a06575-9814-7bbf-bf18-db73a6481c46",
  type: "page-type/world-skill",
  slug: "gardens",
  title: "Gardens",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
