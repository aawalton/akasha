import type { CornerstoneDepth } from "akasha/story/world/pages/cornerstone/mechanics/ranks/depth/cornerstone-depth.page-type.types.ts"

export const cornerstoneDormant = {
  id: "01a0dee6-c3ad-7ecc-92a1-6b84eb571641",
  type: "page-type/cornerstone-depth",
  slug: "cornerstone-dormant",
  title: "Dormant",
  world: "world/cornerstone",
  place: 1,
  description: "No perception or action in this Faculty's domain at all.",
} as const satisfies CornerstoneDepth
