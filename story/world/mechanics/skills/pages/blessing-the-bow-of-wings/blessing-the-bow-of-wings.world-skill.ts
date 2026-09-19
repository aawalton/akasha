import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blessingTheBowOfWings = {
  id: "01a06575-97f6-7e9e-93d0-5084d03f812f",
  type: "page-type/world-skill",
  slug: "blessing-the-bow-of-wings",
  title: "Blessing: The Bow of Wings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
