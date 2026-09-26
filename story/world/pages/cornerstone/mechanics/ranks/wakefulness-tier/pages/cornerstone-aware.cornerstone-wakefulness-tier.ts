import type { CornerstoneWakefulnessTier } from "akasha/story/world/pages/cornerstone/mechanics/ranks/wakefulness-tier/cornerstone-wakefulness-tier.page-type.types.ts"

export const cornerstoneAware = {
  id: "01a0dee7-36d4-71e4-87ca-e9fcd7041a59",
  type: "page-type/cornerstone-wakefulness-tier",
  slug: "cornerstone-aware",
  title: "Aware",
  world: "world/cornerstone",
  place: 2,
  threshold: 2,
  description:
    "The first true senses have woken. The core knows it is a place, not a point, and perceives the immediate settlement.",
} as const satisfies CornerstoneWakefulnessTier
