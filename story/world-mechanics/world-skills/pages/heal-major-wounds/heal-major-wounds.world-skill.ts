import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const healMajorWounds = {
  id: "01a06575-9819-76f6-8233-42dd0d98b40d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "heal-major-wounds",
  title: "Heal Major Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
