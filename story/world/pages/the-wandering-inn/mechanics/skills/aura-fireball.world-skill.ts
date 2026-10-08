import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraFireball = {
  id: "01a06575-97ee-74b5-bfb6-3f2025ab023c",
  type: "page-type/world-skill",
  slug: "aura-fireball",
  title: "Aura Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
