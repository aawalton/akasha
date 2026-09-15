import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const cleanlyHands = {
  id: "01a06575-97fb-758f-a2ce-69e6bced4c7c",
  type: "world-skill",
  slug: "cleanly-hands",
  title: "Cleanly Hands",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
