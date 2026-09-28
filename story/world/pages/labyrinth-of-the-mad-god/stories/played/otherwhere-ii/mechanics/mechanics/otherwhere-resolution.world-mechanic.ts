import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereResolution = {
  id: "01a0e993-be67-726e-a6b3-7575d680346a",
  type: "page-type/world-mechanic",
  slug: "otherwhere-resolution",
  title: "Resolution",
  world: "world/labyrinth-of-the-mad-god",
  description: "Whether what Nala tries comes off: well, at a price, or not at all.",
} as const satisfies WorldMechanic
