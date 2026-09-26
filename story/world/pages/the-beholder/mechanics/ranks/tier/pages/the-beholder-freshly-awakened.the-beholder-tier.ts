import type { TheBeholderTier } from "akasha/story/world/pages/the-beholder/mechanics/ranks/tier/the-beholder-tier.page-type.types.ts"

export const theBeholderFreshlyAwakened = {
  id: "01a0deee-1591-79de-9dec-458124a1ab70",
  type: "page-type/the-beholder-tier",
  slug: "the-beholder-freshly-awakened",
  title: "Freshly-Awakened",
  world: "world/the-beholder",
  place: 2,
  description:
    "One weak or unstable power; attributes 12 to 30. Near-human and beatable by ambush: the power is the threat, not the raw stats.",
} as const satisfies TheBeholderTier
