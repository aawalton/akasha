import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicRiding = {
  id: "01a06575-97f4-74f0-88a9-016a2fccf231",
  type: "page-type/world-skill",
  slug: "basic-riding",
  title: "Basic Riding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
