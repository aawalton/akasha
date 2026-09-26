import type { CornerstoneDepth } from "akasha/story/world/pages/cornerstone/mechanics/ranks/depth/cornerstone-depth.page-type.types.ts"

export const cornerstoneDeep = {
  id: "01a0dee6-c3ac-756b-a94b-2751510df087",
  type: "page-type/cornerstone-depth",
  slug: "cornerstone-deep",
  title: "Deep",
  world: "world/cornerstone",
  place: 5,
  description:
    "Perception reaches beyond the walls and into subtler layers, and the Faculty can begin to act rather than only perceive: Warmth at Depth 4 can soothe a nightmare, and Reach at Depth 4 can shift soil.",
} as const satisfies CornerstoneDepth
