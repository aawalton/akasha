import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const teacherOfMagicUniversal = {
  id: "01a0657d-0310-7411-a6c6-ab3cd24fa6c3",
  type: "page-type/world-skill",
  slug: "teacher-of-magic-universal",
  title: "Teacher of Magic (Universal)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
