import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicLeadership = {
  id: "01a06575-97f3-7e59-953a-a521b512f34a",
  type: "world-skill",
  slug: "basic-leadership",
  title: "Basic Leadership",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
