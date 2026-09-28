import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const otherwhereViiManaGathering = {
  id: "01a0ea37-e051-76f7-9962-5cb3414e0fb9",
  type: "page-type/world-rank",
  slug: "otherwhere-vii-mana-gathering",
  title: "Mana Gathering (Tier 0)",
  world: "world/god-of-trash",
  description: "Awake to mana and gathering it, but not yet a mage.",
  place: 2,
} as const satisfies WorldRank
