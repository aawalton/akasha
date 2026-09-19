import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const keepThoseCamerasRolling = {
  id: "01a06575-9821-7229-b580-9ed54468371e",
  type: "page-type/world-skill",
  slug: "keep-those-cameras-rolling",
  title: "Keep Those Cameras Rolling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
