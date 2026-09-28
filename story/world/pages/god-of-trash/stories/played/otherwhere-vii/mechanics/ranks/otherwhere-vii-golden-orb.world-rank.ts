import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const otherwhereViiGoldenOrb = {
  id: "01a0ea37-e051-733a-bdf4-ec03b1d03299",
  type: "page-type/world-rank",
  slug: "otherwhere-vii-golden-orb",
  title: "Golden Orb (Tier 3)",
  world: "world/god-of-trash",
  description: "A core holding an orb of golden super-pure mana; aging all but stops.",
  place: 5,
} as const satisfies WorldRank
