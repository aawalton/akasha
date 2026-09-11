import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const eviscerateTheUnguarded = {
  id: "01a06575-9809-7bdf-afb1-220e8c0504e1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "eviscerate-the-unguarded",
  title: "Eviscerate the Unguarded",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
