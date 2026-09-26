import type { CornerstoneWakefulnessTier } from "akasha/story/world/pages/cornerstone/mechanics/ranks/wakefulness-tier/cornerstone-wakefulness-tier.page-type.types.ts"

export const cornerstoneDreaming = {
  id: "01a0dee7-36d5-7327-b622-3023374fbf77",
  type: "page-type/cornerstone-wakefulness-tier",
  slug: "cornerstone-dreaming",
  title: "Dreaming",
  world: "world/cornerstone",
  place: 5,
  threshold: 20,
  description:
    "Fully awake, the core can project will and imagination: shape weather, dream futures, guide from afar. It is the endgame guardian-spirit of the place.",
} as const satisfies CornerstoneWakefulnessTier
