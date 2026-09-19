import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hunterSQuarry = {
  id: "01a06575-981b-7ed6-bd8f-ef769b6ba16d",
  type: "page-type/world-skill",
  slug: "hunter-s-quarry",
  title: "Hunter’s Quarry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
