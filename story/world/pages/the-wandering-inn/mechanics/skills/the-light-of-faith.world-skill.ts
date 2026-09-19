import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theLightOfFaith = {
  id: "01a0657d-0312-7a4b-8fd4-cf22a8492a2c",
  type: "page-type/world-skill",
  slug: "the-light-of-faith",
  title: "The Light of Faith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
