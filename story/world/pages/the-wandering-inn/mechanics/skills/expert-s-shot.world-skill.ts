import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expertSShot = {
  id: "01a06575-980a-70b1-9d2e-aa5268939127",
  type: "page-type/world-skill",
  slug: "expert-s-shot",
  title: "Expert’s Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
