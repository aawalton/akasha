import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const garden = {
  id: "01a06575-9814-7cbf-a210-a46f945964d0",
  type: "world-skill",
  slug: "garden",
  title: "Garden",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
