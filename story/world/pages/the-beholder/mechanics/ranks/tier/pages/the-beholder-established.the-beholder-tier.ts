import type { TheBeholderTier } from "akasha/story/world/pages/the-beholder/mechanics/ranks/tier/the-beholder-tier.page-type.types.ts"

export const theBeholderEstablished = {
  id: "01a0deee-1591-78b2-90b8-a402f3cc8420",
  type: "page-type/the-beholder-tier",
  slug: "the-beholder-established",
  title: "Established",
  world: "world/the-beholder",
  place: 3,
  description: "A developed power; attributes 35 to 80.",
} as const satisfies TheBeholderTier
