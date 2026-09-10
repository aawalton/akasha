import type { WorldItem } from "../../world-item.page-type.types.ts"

export const portalDoor = {
  id: "01a0655a-7b7f-720d-a109-d4ffa09ce371",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "portal-door",
  title: "Portal Door",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
