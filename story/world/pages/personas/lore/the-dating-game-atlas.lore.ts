import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAtlas = {
  id: "01a0de59-9644-7e6b-93b4-1bf69dff957c",
  type: "page-type/lore",
  slug: "the-dating-game-atlas",
  title: "Atlas",
  world: "world/personas",
  about: "persona/atlas",
  secrets: "jsonl",
} as const satisfies Lore
