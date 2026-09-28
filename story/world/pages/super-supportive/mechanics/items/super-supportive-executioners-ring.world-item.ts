import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveExecutionersRing = {
  id: "01a0e9fa-4780-7eec-99bd-030de720dfc6",
  type: "page-type/world-item",
  slug: "super-supportive-executioners-ring",
  title: "Executioner's ring",
  world: "world/super-supportive",
  aliases: ["ring of death"],
  description: "A black ring engraved with the logogram for death.",
} as const satisfies WorldItem
