import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicLeadership = {
  id: "01a06575-97f3-7e59-953a-a521b512f34a",
  type: "page-type/world-skill",
  slug: "basic-leadership",
  title: "Basic Leadership",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
