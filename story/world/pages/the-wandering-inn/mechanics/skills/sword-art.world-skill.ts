import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swordArt = {
  id: "01a0657d-0307-79f7-a6e8-39844ce0dfa3",
  type: "page-type/world-skill",
  slug: "sword-art",
  title: "Sword Art",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.727Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
