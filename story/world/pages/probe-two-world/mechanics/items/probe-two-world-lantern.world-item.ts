import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const probeTwoWorldLantern = {
  id: "01a17fbf-aff5-7477-a00f-b55e774e02b4",
  type: "page-type/world-item",
  slug: "probe-two-world-lantern",
  title: "Lantern",
  world: "world/probe-two-world",
  description: "A tin lantern with a glass window and a wire handle.",
  category: "tool",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies WorldItem
