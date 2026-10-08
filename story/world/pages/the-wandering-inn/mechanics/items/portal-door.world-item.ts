import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const portalDoor = {
  id: "01a0655a-7b7f-720d-a109-d4ffa09ce371",
  type: "page-type/world-item",
  slug: "portal-door",
  title: "Portal Door",
  world: "world/the-wandering-inn",
  appearanceCount: 24,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.807Z",
  updatedAt: "2026-09-22T13:30:32.000Z",
} as const satisfies WorldItem
