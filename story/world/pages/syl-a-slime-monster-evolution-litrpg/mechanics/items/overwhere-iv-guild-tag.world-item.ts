import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIvGuildTag = {
  id: "01a0ed31-f1da-7282-a341-9f9cf49c11b4",
  type: "page-type/world-item",
  slug: "overwhere-iv-guild-tag",
  title: "Guild Tag",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "An adventurer's crystal tag, bearing a name and holding coin, kills and quests.",
} as const satisfies WorldItem
