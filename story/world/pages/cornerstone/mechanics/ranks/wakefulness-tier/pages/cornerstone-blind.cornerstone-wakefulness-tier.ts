import type { CornerstoneWakefulnessTier } from "akasha/story/world/pages/cornerstone/mechanics/ranks/wakefulness-tier/cornerstone-wakefulness-tier.page-type.types.ts"

export const cornerstoneBlind = {
  id: "01a0dee7-36d5-7a48-8ae7-bec18b8416fc",
  type: "page-type/cornerstone-wakefulness-tier",
  slug: "cornerstone-blind",
  title: "Blind",
  world: "world/cornerstone",
  place: 1,
  threshold: 1,
  description:
    "Only innate Touch. The core perceives only direct contact with its own buried soil.",
  createdAt: "2026-09-26T18:08:09.941Z",
  updatedAt: "2026-09-26T18:08:14.000Z",
} as const satisfies CornerstoneWakefulnessTier
