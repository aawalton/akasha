import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const healModerateWounds = {
  id: "01a06575-9819-7ff1-a3ab-48c4c66df8e3",
  type: "page-type/world-skill",
  slug: "heal-moderate-wounds",
  title: "Heal Moderate Wounds",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.601Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
