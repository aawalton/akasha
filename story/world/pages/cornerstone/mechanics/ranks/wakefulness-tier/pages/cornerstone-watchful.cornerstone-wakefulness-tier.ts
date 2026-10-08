import type { CornerstoneWakefulnessTier } from "akasha/story/world/pages/cornerstone/mechanics/ranks/wakefulness-tier/cornerstone-wakefulness-tier.page-type.types.ts"

export const cornerstoneWatchful = {
  id: "01a0dee7-36d5-7be0-a276-98cdeea81508",
  type: "page-type/cornerstone-wakefulness-tier",
  slug: "cornerstone-watchful",
  title: "Watchful",
  world: "world/cornerstone",
  place: 3,
  threshold: 6,
  description:
    "Several senses are open; the core perceives beyond its own soil and begins to lightly act. The town is a real, defensible settlement.",
  createdAt: "2026-09-26T18:08:09.941Z",
  updatedAt: "2026-09-26T18:08:14.000Z",
} as const satisfies CornerstoneWakefulnessTier
