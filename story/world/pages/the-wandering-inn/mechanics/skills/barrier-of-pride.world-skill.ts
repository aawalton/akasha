import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barrierOfPride = {
  id: "01a06575-97f3-7686-8627-697467c4504e",
  type: "page-type/world-skill",
  slug: "barrier-of-pride",
  title: "Barrier of Pride",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
