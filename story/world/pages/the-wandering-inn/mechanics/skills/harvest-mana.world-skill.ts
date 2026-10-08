import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const harvestMana = {
  id: "01a06575-9818-7e0c-a837-97ed43e259df",
  type: "page-type/world-skill",
  slug: "harvest-mana",
  title: "Harvest Mana",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
