import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantDuck = {
  id: "01a06575-981f-7ba5-81d8-4c472fbaee37",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "instant-duck",
  title: "Instant Duck",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
