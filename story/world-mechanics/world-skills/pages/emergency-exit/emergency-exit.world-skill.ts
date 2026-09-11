import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const emergencyExit = {
  id: "01a06575-9807-7952-a37e-5b6c2d9195f4",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "emergency-exit",
  title: "Emergency Exit",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
