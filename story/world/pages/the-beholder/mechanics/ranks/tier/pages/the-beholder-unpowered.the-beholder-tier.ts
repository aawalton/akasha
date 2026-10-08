import type { TheBeholderTier } from "akasha/story/world/pages/the-beholder/mechanics/ranks/tier/the-beholder-tier.page-type.types.ts"

export const theBeholderUnpowered = {
  id: "01a0deee-1591-703e-97ba-a5cf6e11a214",
  type: "page-type/the-beholder-tier",
  slug: "the-beholder-unpowered",
  title: "Unpowered",
  world: "world/the-beholder",
  place: 1,
  description:
    "No power; attributes 8 to 22, most near 10, with exceptional humans in the mid-teens or low 20s. Only attributes can be taken.",
  createdAt: "2026-09-26T18:15:40.177Z",
  updatedAt: "2026-09-26T18:15:44.000Z",
} as const satisfies TheBeholderTier
