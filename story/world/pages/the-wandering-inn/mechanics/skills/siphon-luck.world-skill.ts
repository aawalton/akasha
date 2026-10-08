import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const siphonLuck = {
  id: "01a0657d-02c5-7970-952f-a54fe8212e5d",
  type: "page-type/world-skill",
  slug: "siphon-luck",
  title: "Siphon Luck",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.661Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
