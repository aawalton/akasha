import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const windCutter = {
  id: "01a0657d-0336-7b04-b376-ce4148b6cac6",
  type: "page-type/world-skill",
  slug: "wind-cutter",
  title: "Wind Cutter",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.774Z",
  updatedAt: "2026-09-22T13:33:49.000Z",
} as const satisfies WorldSkill
