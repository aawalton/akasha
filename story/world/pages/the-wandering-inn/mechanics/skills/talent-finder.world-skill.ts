import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const talentFinder = {
  id: "01a0657d-0308-7834-a4b3-f32e0b35406b",
  type: "page-type/world-skill",
  slug: "talent-finder",
  title: "Talent Finder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
