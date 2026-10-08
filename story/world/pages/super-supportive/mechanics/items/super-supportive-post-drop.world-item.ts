import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportivePostDrop = {
  id: "01a0e9f4-be68-7047-ad1b-896a96872c3b",
  type: "page-type/world-item",
  slug: "super-supportive-post-drop",
  title: "Post Drop",
  world: "world/super-supportive",
  description: "A talking mailbox on Anesidora that scans and sends mail.",
  createdAt: "2026-09-28T21:38:45.992Z",
  updatedAt: "2026-09-28T21:38:49.000Z",
} as const satisfies WorldItem
