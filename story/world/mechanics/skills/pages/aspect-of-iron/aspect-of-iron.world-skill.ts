import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aspectOfIron = {
  id: "01a06575-97ee-729f-a1bc-4a5d45f5ca6a",
  type: "page-type/world-skill",
  slug: "aspect-of-iron",
  title: "Aspect of Iron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
