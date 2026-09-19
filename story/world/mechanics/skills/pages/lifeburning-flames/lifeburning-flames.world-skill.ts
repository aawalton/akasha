import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lifeburningFlames = {
  id: "01a0657d-023a-7288-b22b-eb6346fd0cb2",
  type: "page-type/world-skill",
  slug: "lifeburning-flames",
  title: "Lifeburning Flames",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
