import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bugfriend = {
  id: "01a06575-97f9-72c9-8b66-071a451e6aa5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "bugfriend",
  title: "Bugfriend",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
