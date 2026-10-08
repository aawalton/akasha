import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stealthArrow = {
  id: "01a0657d-02f9-7cd7-92e1-7e2c42a70b41",
  type: "page-type/world-skill",
  slug: "stealth-arrow",
  title: "Stealth Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.713Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
