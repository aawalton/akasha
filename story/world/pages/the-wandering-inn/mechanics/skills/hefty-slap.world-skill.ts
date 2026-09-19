import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heftySlap = {
  id: "01a06575-9819-755c-afd9-6a1e79dd39ce",
  type: "page-type/world-skill",
  slug: "hefty-slap",
  title: "Hefty Slap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
