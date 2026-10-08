import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipSBeacon = {
  id: "01a0657d-02c0-7c99-8109-6136f4f6095e",
  type: "page-type/world-skill",
  slug: "ship-s-beacon",
  title: "Ship’s Beacon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.656Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
