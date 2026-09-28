import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveLevel = {
  id: "01a0e9f7-dffa-7f72-83a6-5a886dc0b138",
  type: "page-type/world-mechanic",
  slug: "super-supportive-level",
  title: "Level",
  world: "world/super-supportive",
  aliases: ["overall level", "skill level"],
  description: "The number a skill, or an Avowed as a whole, has reached by leveling.",
} as const satisfies WorldMechanic
