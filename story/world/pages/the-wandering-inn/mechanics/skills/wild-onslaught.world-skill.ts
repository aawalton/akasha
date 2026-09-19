import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildOnslaught = {
  id: "01a0657d-032e-7f1e-acb3-5f4cbcb5436d",
  type: "page-type/world-skill",
  slug: "wild-onslaught",
  title: "Wild Onslaught",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
