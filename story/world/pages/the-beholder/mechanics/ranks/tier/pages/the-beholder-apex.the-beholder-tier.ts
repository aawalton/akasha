import type { TheBeholderTier } from "akasha/story/world/pages/the-beholder/mechanics/ranks/tier/the-beholder-tier.page-type.types.ts"

export const theBeholderApex = {
  id: "01a0deee-1590-7c1d-b185-fd150bf877f1",
  type: "page-type/the-beholder-tier",
  slug: "the-beholder-apex",
  title: "Apex",
  world: "world/the-beholder",
  place: 5,
  description: "A rare signature power; attributes 165 and up.",
} as const satisfies TheBeholderTier
