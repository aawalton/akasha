import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const encouragingPat = {
  id: "01a06575-9808-7fd4-8907-d48c7fdeaa71",
  type: "page-type/world-skill",
  slug: "encouraging-pat",
  title: "Encouraging Pat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
