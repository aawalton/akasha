import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reinforcedArrows = {
  id: "01a0657d-02a6-727d-8a90-fe678f3b6e6d",
  type: "page-type/world-skill",
  slug: "reinforced-arrows",
  title: "Reinforced Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
