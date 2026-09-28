import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveOriginals = {
  id: "01a0e9f5-fded-78b9-900a-1f4ca8161d0f",
  type: "page-type/world-title",
  slug: "super-supportive-originals",
  title: "the originals",
  world: "world/super-supportive",
  aliases: ["first generation", "original Avowed"],
  description: "A name for the first generation of Earth's Avowed.",
} as const satisfies WorldTitle
