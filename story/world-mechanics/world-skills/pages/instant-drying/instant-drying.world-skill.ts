import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantDrying = {
  id: "01a06575-981f-7fe0-b95b-cbaf3d38d312",
  type: "world-skill",
  slug: "instant-drying",
  title: "Instant Drying",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
