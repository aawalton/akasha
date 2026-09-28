import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveFirstBinding = {
  id: "01a0e9f5-fded-754e-b0d7-1f10c061ac3b",
  type: "page-type/world-mechanic",
  slug: "super-supportive-first-binding",
  title: "first binding",
  world: "world/super-supportive",
  aliases: ["first affixation", "first binding of authority"],
  description: "A future knight's first affixation, which binds their authority into a skill.",
} as const satisfies WorldMechanic
