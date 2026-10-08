import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const restoreAppearance = {
  id: "01a0657d-02b1-747a-abd7-7df0098c8424",
  type: "page-type/world-skill",
  slug: "restore-appearance",
  title: "Restore Appearance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.641Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
