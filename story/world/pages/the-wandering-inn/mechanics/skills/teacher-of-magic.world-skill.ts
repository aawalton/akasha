import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const teacherOfMagic = {
  id: "01a0657d-0310-7912-ab6e-e1832b829550",
  type: "page-type/world-skill",
  slug: "teacher-of-magic",
  title: "Teacher of Magic",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.736Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
