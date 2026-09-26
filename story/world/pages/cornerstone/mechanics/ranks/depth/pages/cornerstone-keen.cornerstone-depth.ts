import type { CornerstoneDepth } from "akasha/story/world/pages/cornerstone/mechanics/ranks/depth/cornerstone-depth.page-type.types.ts"

export const cornerstoneKeen = {
  id: "01a0dee6-c3ad-7a4c-9867-cf1ec81abd76",
  type: "page-type/cornerstone-depth",
  slug: "cornerstone-keen",
  title: "Keen",
  world: "world/cornerstone",
  place: 4,
  description: "Fine detail and slight anticipation, such as sensing scarcity a few days out.",
} as const satisfies CornerstoneDepth
