import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hammersOfFaith = {
  id: "01a06575-9818-7661-9d99-abb9e1238247",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hammers-of-faith",
  title: "Hammers of Faith",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
