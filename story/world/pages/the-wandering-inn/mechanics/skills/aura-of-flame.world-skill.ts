import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfFlame = {
  id: "01a06575-97ee-747a-a6d7-a58ebf1efc41",
  type: "page-type/world-skill",
  slug: "aura-of-flame",
  title: "Aura of Flame",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
