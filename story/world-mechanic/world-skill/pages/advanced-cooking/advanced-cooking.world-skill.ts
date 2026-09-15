import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const advancedCooking = {
  id: "01a06575-97e9-742d-a3b3-55355fceaa39",
  type: "world-skill",
  slug: "advanced-cooking",
  title: "Advanced Cooking",
  world: "world/the-wandering-inn",
  aliases: ["Advanced Cooking?"],
  references: "jsonl",
} as const satisfies WorldSkill
