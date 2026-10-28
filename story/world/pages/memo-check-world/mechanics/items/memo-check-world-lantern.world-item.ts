import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const memoCheckWorldLantern = {
  id: "01a1832d-38c0-7707-87ca-1254fec18d24",
  type: "page-type/world-item",
  slug: "memo-check-world-lantern",
  title: "Lantern",
  world: "world/memo-check-world",
  description: "A tin lantern with a glass window and a wire handle.",
  category: "tool",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies WorldItem
