import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const camouflageArmor = {
  id: "01a06575-97fa-74b9-924d-257cc7df9f18",
  type: "page-type/world-skill",
  slug: "camouflage-armor",
  title: "Camouflage Armor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
