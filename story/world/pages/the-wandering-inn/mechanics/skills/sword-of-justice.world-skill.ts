import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swordOfJustice = {
  id: "01a0657d-0307-7571-a70e-1f5593d4ef7f",
  type: "page-type/world-skill",
  slug: "sword-of-justice",
  title: "Sword of Justice",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.727Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
