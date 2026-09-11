import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const boostedMoraleUnit = {
  id: "01a06575-97f8-7928-8e66-d238942e60eb",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "boosted-morale-unit",
  title: "Boosted Morale (Unit)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
