import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveEvacuationKit = {
  id: "01a0e9f8-6bb3-71c9-9b9f-eea1cb81facd",
  type: "page-type/world-item",
  slug: "super-supportive-evacuation-kit",
  title: "evacuation kit",
  world: "world/super-supportive",
  aliases: ["beacon orb", "personal medical kit"],
  description:
    "A prepared case of supplies for one person's evacuation, with a beacon orb, medical kit and tablet.",
  createdAt: "2026-09-28T21:42:46.963Z",
  updatedAt: "2026-09-28T21:42:50.000Z",
} as const satisfies WorldItem
