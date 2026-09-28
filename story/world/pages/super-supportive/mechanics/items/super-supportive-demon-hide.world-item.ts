import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveDemonHide = {
  id: "01a0e9fc-0700-78e9-b6b9-05a64645c83f",
  type: "page-type/world-item",
  slug: "super-supportive-demon-hide",
  title: "Demon hide",
  world: "world/super-supportive",
  aliases: ["transmogrified demon skin"],
  description:
    "The skin of a demon, transmogrified to remove its taint while keeping its useful properties.",
} as const satisfies WorldItem
