import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantDrying = {
  id: "01a06575-981f-7fe0-b95b-cbaf3d38d312",
  type: "page-type/world-skill",
  slug: "instant-drying",
  title: "Instant Drying",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
