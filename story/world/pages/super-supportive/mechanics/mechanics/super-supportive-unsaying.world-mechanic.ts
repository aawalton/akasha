import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveUnsaying = {
  id: "01a0e9fa-4781-7021-906f-7659da13a967",
  type: "page-type/world-mechanic",
  slug: "super-supportive-unsaying",
  title: "Unsaying",
  world: "world/super-supportive",
  aliases: ["mercy from my pockets"],
  description: "An accused wizard asking witnesses to take back a claim made against them.",
} as const satisfies WorldMechanic
