import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const teacherOfMagic = {
  id: "01a0657d-0310-7912-ab6e-e1832b829550",
  type: "page-type/world-skill",
  slug: "teacher-of-magic",
  title: "Teacher of Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
