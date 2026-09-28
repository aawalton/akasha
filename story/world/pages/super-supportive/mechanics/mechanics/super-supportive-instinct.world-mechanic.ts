import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveInstinct = {
  id: "01a0e9f7-dffa-78a4-8253-63f118dec0f2",
  type: "page-type/world-mechanic",
  slug: "super-supportive-instinct",
  title: "Instinct",
  world: "world/super-supportive",
  description: "A stat for gut awareness of the surroundings.",
} as const satisfies WorldMechanic
