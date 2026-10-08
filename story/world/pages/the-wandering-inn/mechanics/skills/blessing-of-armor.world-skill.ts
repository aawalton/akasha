import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blessingOfArmor = {
  id: "01a06575-97f6-77c7-b707-eedb813cb99e",
  type: "page-type/world-skill",
  slug: "blessing-of-armor",
  title: "Blessing of Armor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.566Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
