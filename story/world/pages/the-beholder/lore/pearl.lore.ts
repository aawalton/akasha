import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pearl = {
  id: "01a0ddf8-63fd-788a-b374-75f30cb0f670",
  type: "page-type/lore",
  slug: "pearl",
  title: "Pearl",
  world: "world/the-beholder",
  about: "character-player/the-beholder-pearl",
  secrets: "jsonl",
} as const satisfies Lore
