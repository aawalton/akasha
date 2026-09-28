import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveFiveLeafFan = {
  id: "01a0e9f9-7731-72d6-ab93-91f08f75bb0b",
  type: "page-type/world-item",
  slug: "super-supportive-five-leaf-fan",
  title: "Five-leaf fan",
  world: "world/super-supportive",
  aliases: ["casting fan", "engraved fan"],
  description:
    "A black engraved folding fan used as a casting tool, with shallow dimples for the fingers.",
} as const satisfies WorldItem
