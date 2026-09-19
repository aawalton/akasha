import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastTraveling = {
  id: "01a06575-980c-7dd2-9f20-c5170aa1a84f",
  type: "page-type/world-skill",
  slug: "fast-traveling",
  title: "Fast Traveling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
