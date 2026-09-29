import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereXEscapeScroll = {
  id: "01a0ea7a-5bda-7cd3-8d13-a8a43fbdb43f",
  type: "page-type/world-item",
  slug: "otherwhere-x-escape-scroll",
  title: "Escape Scroll",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A magic scroll that teleports whoever tears it.",
} as const satisfies WorldItem
