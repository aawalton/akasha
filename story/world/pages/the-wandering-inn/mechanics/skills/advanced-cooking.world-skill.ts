import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedCooking = {
  id: "01a06575-97e9-742d-a3b3-55355fceaa39",
  type: "page-type/world-skill",
  slug: "advanced-cooking",
  title: "Advanced Cooking",
  world: "world/the-wandering-inn",
  appearanceCount: 37,
  aliases: ["Advanced Cooking?"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.553Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
