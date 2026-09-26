import type { CornerstoneDepth } from "akasha/story/world/pages/cornerstone/mechanics/ranks/depth/cornerstone-depth.page-type.types.ts"

export const cornerstoneOpen = {
  id: "01a0dee6-c3ad-7ed8-9ebb-2c88f53bb116",
  type: "page-type/cornerstone-depth",
  slug: "cornerstone-open",
  title: "Open",
  world: "world/cornerstone",
  place: 3,
  description: "Reliable present-tense perception across the immediate settlement.",
} as const satisfies CornerstoneDepth
