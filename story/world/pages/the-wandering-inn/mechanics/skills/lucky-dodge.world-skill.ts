import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const luckyDodge = {
  id: "01a0657d-0241-73bc-9c52-6397693a3bfc",
  type: "page-type/world-skill",
  slug: "lucky-dodge",
  title: "Lucky Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.529Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
