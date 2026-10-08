import type { TheBeholderTier } from "akasha/story/world/pages/the-beholder/mechanics/ranks/tier/the-beholder-tier.page-type.types.ts"

export const theBeholderElite = {
  id: "01a0deee-1590-76e8-a2f1-dda32a22b30d",
  type: "page-type/the-beholder-tier",
  slug: "the-beholder-elite",
  title: "Elite",
  world: "world/the-beholder",
  place: 4,
  description: "A strong power; attributes 85 to 160.",
  createdAt: "2026-09-26T18:15:40.176Z",
  updatedAt: "2026-09-26T18:15:44.000Z",
} as const satisfies TheBeholderTier
