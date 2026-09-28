import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSoundBlockingTent = {
  id: "01a0e9fc-0701-73c7-924a-e91db24c404d",
  type: "page-type/world-item",
  slug: "super-supportive-sound-blocking-tent",
  title: "Sound-blocking tent",
  world: "world/super-supportive",
  aliases: ["soundproof tent"],
  description: "A bag that opens into an opaque green half-dome no sound escapes.",
} as const satisfies WorldItem
