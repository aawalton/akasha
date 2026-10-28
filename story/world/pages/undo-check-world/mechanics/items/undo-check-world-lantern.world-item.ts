import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const undoCheckWorldLantern = {
  id: "01a18309-e114-7db6-9c6b-63900b867ca5",
  type: "page-type/world-item",
  slug: "undo-check-world-lantern",
  title: "Lantern",
  world: "world/undo-check-world",
  description: "A tin lantern with a glass window and a wire handle.",
  category: "tool",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies WorldItem
