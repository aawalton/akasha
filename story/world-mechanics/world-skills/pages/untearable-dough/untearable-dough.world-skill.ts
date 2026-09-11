import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const untearableDough = {
  id: "01a0657d-031f-7948-949b-6d6f8bee2722",
  type: "world-skill",
  slug: "untearable-dough",
  title: "Untearable Dough",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
