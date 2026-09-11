import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const encoreSkill = {
  id: "01a06575-9808-7cba-9943-3dfb557b6838",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "encore-skill",
  title: "Encore Skill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
