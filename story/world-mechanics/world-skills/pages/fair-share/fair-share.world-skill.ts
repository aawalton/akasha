import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fairShare = {
  id: "01a06575-980b-7e84-bbff-7b8522fe7dc3",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fair-share",
  title: "Fair Share",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
