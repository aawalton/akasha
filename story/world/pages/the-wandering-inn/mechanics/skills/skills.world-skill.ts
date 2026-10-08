import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skills = {
  id: "01a0657d-02c6-76c2-bce6-93c3bd9c8345",
  type: "page-type/world-skill",
  slug: "skills",
  title: "Skills",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.662Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
