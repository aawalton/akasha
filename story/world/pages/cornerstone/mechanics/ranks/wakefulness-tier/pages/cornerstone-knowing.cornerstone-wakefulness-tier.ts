import type { CornerstoneWakefulnessTier } from "akasha/story/world/pages/cornerstone/mechanics/ranks/wakefulness-tier/cornerstone-wakefulness-tier.page-type.types.ts"

export const cornerstoneKnowing = {
  id: "01a0dee7-36d5-7ea7-adec-c77301d6dfc5",
  type: "page-type/cornerstone-wakefulness-tier",
  slug: "cornerstone-knowing",
  title: "Knowing",
  world: "world/cornerstone",
  place: 4,
  threshold: 12,
  description:
    "The Faculties run deep; the core anticipates and acts deliberately. The first fused Powers appear, and the town is established.",
} as const satisfies CornerstoneWakefulnessTier
