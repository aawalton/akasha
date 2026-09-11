import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const climberSHold = {
  id: "01a06575-97fb-7cd6-ab64-09ad64725755",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "climber-s-hold",
  title: "Climber’s Hold",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
