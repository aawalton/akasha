import type { CornerstoneDepth } from "akasha/story/world/pages/cornerstone/mechanics/ranks/depth/cornerstone-depth.page-type.types.ts"

export const cornerstoneProfound = {
  id: "01a0dee6-c3ad-7c81-b79e-c8eba2531b44",
  type: "page-type/cornerstone-depth",
  slug: "cornerstone-profound",
  title: "Profound",
  world: "world/cornerstone",
  place: 6,
  description:
    "Mastery; the Faculty becomes fusion-ready, the prerequisite for fusing it into a higher Power through Research.",
} as const satisfies CornerstoneDepth
