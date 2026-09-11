import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ironScales = {
  id: "01a06575-9820-747d-b346-831725ec19f3",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "iron-scales",
  title: "Iron Scales",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
