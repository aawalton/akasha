import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const powerKick = {
  id: "01a0657d-0295-7fc1-add3-70490c136c07",
  type: "page-type/world-skill",
  slug: "power-kick",
  title: "Power Kick",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
