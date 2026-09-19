import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const encoreSkill = {
  id: "01a06575-9808-7cba-9943-3dfb557b6838",
  type: "page-type/world-skill",
  slug: "encore-skill",
  title: "Encore Skill",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
