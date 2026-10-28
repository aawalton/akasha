import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const timeProbeWorldLantern = {
  id: "01a1802d-b13e-78bd-ad0d-615be7d31048",
  type: "page-type/world-item",
  slug: "time-probe-world-lantern",
  title: "Lantern",
  world: "world/time-probe-world",
  description: "A tin lantern with a glass window and a wire handle.",
  category: "tool",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies WorldItem
