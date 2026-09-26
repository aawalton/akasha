import type { CornerstoneDepth } from "akasha/story/world/pages/cornerstone/mechanics/ranks/depth/cornerstone-depth.page-type.types.ts"

export const cornerstoneStirred = {
  id: "01a0dee6-c3ad-7fee-bb2d-89a30f0b16ac",
  type: "page-type/cornerstone-depth",
  slug: "cornerstone-stirred",
  title: "Stirred",
  world: "world/cornerstone",
  place: 2,
  description:
    "A dim, unreliable trickle: the broad fact, such as that someone is sad, but no detail.",
} as const satisfies CornerstoneDepth
