import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const personalUndead = {
  id: "01a0657d-028f-7994-a2c1-2a50020efd62",
  type: "page-type/world-skill",
  slug: "personal-undead",
  title: "Personal Undead",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
