import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const restoreCourage = {
  id: "01a0657d-02b1-7302-9bb1-3fe25715d14c",
  type: "page-type/world-skill",
  slug: "restore-courage",
  title: "Restore Courage",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.641Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
