import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereXDistressBeacon = {
  id: "01a0ea7a-5bda-7cb3-b076-7f1ca4194b10",
  type: "page-type/world-item",
  slug: "otherwhere-x-distress-beacon",
  title: "Distress Beacon",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A carved jade stone that sends out a call for help.",
} as const satisfies WorldItem
