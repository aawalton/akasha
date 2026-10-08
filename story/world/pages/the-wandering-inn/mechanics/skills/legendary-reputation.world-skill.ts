import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const legendaryReputation = {
  id: "01a06575-9822-73be-99fc-ef964fb81d90",
  type: "page-type/world-skill",
  slug: "legendary-reputation",
  title: "Legendary Reputation",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
