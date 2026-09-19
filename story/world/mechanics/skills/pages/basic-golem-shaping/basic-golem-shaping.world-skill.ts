import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicGolemShaping = {
  id: "01a06575-97f3-7077-818b-d3701347bf02",
  type: "page-type/world-skill",
  slug: "basic-golem-shaping",
  title: "Basic Golem Shaping",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
