import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const portalDoor = {
  id: "01a0655a-7b7f-720d-a109-d4ffa09ce371",
  type: "page-type/world-item",
  slug: "portal-door",
  title: "Portal Door",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
