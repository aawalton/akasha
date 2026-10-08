import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const homingSpell = {
  id: "01a06575-981a-7ea6-95a4-35b75d404107",
  type: "page-type/world-skill",
  slug: "homing-spell",
  title: "Homing Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.602Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
