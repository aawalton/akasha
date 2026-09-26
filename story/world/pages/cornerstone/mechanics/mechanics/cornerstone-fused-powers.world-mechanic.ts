import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const cornerstoneFusedPowers = {
  id: "01a0dee5-5ff9-7336-b126-6083f869b184",
  type: "page-type/world-mechanic",
  slug: "cornerstone-fused-powers",
  title: "Fused Powers",
  world: "world/cornerstone",
  description:
    "Research can fuse two Faculties into a higher Power once at least two Faculties stand at Depth 3 or more. A fusion adds no Wakefulness but unlocks a named Power: Sight and Memory fuse into Foresight, and Warmth and Provision fuse into Stewardship. The first fused Powers appear at the Knowing tier.",
} as const satisfies WorldMechanic
