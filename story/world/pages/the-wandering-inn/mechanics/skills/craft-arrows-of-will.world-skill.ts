import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const craftArrowsOfWill = {
  id: "01a06575-97fe-73e3-ac93-60f76781cdc2",
  type: "page-type/world-skill",
  slug: "craft-arrows-of-will",
  title: "Craft: Arrows of Will",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
