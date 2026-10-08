import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nonLethalStrike = {
  id: "01a0657d-027b-7e6e-b8e0-933c7f27902f",
  type: "page-type/world-skill",
  slug: "non-lethal-strike",
  title: "Non-Lethal Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.587Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
