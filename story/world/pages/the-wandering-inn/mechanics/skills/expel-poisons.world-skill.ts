import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expelPoisons = {
  id: "01a06575-980a-7b4a-9981-6661e3bd97c8",
  type: "page-type/world-skill",
  slug: "expel-poisons",
  title: "Expel Poisons",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.586Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
