import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const invisibleCast = {
  id: "01a06575-9820-788f-a074-0e772d15a22b",
  type: "page-type/world-skill",
  slug: "invisible-cast",
  title: "Invisible Cast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
