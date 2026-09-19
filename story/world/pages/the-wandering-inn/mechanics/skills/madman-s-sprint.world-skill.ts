import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const madmanSSprint = {
  id: "01a0657d-0241-77f1-b1f7-8b2bcf583164",
  type: "page-type/world-skill",
  slug: "madman-s-sprint",
  title: "Madman’s Sprint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
