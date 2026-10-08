import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const safetyZone = {
  id: "01a0657d-02b7-7874-85f7-2a1bf07df6b4",
  type: "page-type/world-skill",
  slug: "safety-zone",
  title: "Safety Zone",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.647Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
