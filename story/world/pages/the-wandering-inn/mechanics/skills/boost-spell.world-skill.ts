import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boostSpell = {
  id: "01a06575-97f8-7ead-a15a-1933efa6213d",
  type: "page-type/world-skill",
  slug: "boost-spell",
  title: "Boost Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.568Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
