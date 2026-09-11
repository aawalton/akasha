import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const gracefulEngagement = {
  id: "01a06575-9816-76a7-8755-3815cd85937e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "graceful-engagement",
  title: "Graceful Engagement",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
