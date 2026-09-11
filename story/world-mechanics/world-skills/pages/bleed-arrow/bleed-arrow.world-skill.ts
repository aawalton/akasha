import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bleedArrow = {
  id: "01a06575-97f6-7445-a783-15836c0e13da",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "bleed-arrow",
  title: "Bleed Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
