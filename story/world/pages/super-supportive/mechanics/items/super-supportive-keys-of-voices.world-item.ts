import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveKeysOfVoices = {
  id: "01a0e9f8-6bb3-7faf-b7a8-05b16fa96aec",
  type: "page-type/world-item",
  slug: "super-supportive-keys-of-voices",
  title: "keys of voices",
  world: "world/super-supportive",
  aliases: ["keys", "keys of eyes"],
  description: "Small black discs that glitter at the edges.",
} as const satisfies WorldItem
