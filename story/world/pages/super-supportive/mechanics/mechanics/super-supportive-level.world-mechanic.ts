import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveLevel = {
  id: "01a0e9f7-dffa-7f72-83a6-5a886dc0b138",
  type: "page-type/world-mechanic",
  slug: "super-supportive-level",
  title: "Level",
  world: "world/super-supportive",
  aliases: ["overall level", "skill level"],
  description: "The number a skill, or an Avowed as a whole, has reached by leveling.",
  createdAt: "2026-09-28T21:42:11.194Z",
  updatedAt: "2026-09-28T21:42:14.000Z",
} as const satisfies WorldMechanic
