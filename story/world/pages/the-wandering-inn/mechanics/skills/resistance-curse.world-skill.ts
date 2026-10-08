import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceCurse = {
  id: "01a0657d-02b1-718c-b476-4e0738e0193d",
  type: "page-type/world-skill",
  slug: "resistance-curse",
  title: "Resistance: Curse",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.641Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
