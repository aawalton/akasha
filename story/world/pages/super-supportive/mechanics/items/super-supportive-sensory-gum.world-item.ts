import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSensoryGum = {
  id: "01a0e9f4-be68-7980-9140-ee14be15bcf1",
  type: "page-type/world-item",
  slug: "super-supportive-sensory-gum",
  title: "Sensory gum",
  world: "world/super-supportive",
  aliases: ["sensory sharing gum"],
  description: "A gum that links taste, smell and touch between people who chew it.",
  createdAt: "2026-09-28T21:38:45.992Z",
  updatedAt: "2026-09-28T21:38:49.000Z",
} as const satisfies WorldItem
