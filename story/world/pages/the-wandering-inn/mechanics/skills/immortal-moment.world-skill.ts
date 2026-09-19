import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immortalMoment = {
  id: "01a06575-981d-79e0-a8a6-b186a905d020",
  type: "page-type/world-skill",
  slug: "immortal-moment",
  title: "Immortal Moment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
