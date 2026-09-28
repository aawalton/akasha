import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveBarrierDevice = {
  id: "01a0e9f4-be66-7133-bf52-417c7e89383e",
  type: "page-type/world-item",
  slug: "super-supportive-barrier-device",
  title: "Shielder",
  world: "world/super-supportive",
  aliases: ["barrier device"],
  description: "A tall wand-shaped device; several together make a light dome that zaps demons.",
} as const satisfies WorldItem
