import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const healModerateWounds = {
  id: "01a06575-9819-7ff1-a3ab-48c4c66df8e3",
  type: "page-type/world-skill",
  slug: "heal-moderate-wounds",
  title: "Heal Moderate Wounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
