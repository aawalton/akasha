import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const championSGear = {
  id: "01a06575-97fa-72e2-aa1a-6446b1e64871",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "champion-s-gear",
  title: "Champion’s Gear",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
