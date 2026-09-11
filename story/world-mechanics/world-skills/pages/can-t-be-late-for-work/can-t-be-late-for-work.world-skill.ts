import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const canTBeLateForWork = {
  id: "01a06575-97fa-7483-a1d3-c2047a8a0a75",
  type: "world-skill",
  slug: "can-t-be-late-for-work",
  title: "Can’t Be Late for Work",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
