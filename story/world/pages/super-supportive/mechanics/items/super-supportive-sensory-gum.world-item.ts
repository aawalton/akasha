import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSensoryGum = {
  id: "01a0e9f4-be68-7980-9140-ee14be15bcf1",
  type: "page-type/world-item",
  slug: "super-supportive-sensory-gum",
  title: "Sensory gum",
  world: "world/super-supportive",
  aliases: ["sensory sharing gum"],
  description: "A gum that links taste, smell and touch between people who chew it.",
} as const satisfies WorldItem
