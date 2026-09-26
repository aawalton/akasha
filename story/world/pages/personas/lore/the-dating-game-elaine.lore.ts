import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameElaine = {
  id: "01a0de59-9645-7f4b-9543-e9e5be178d32",
  type: "page-type/lore",
  slug: "the-dating-game-elaine",
  title: "Elaine",
  world: "world/personas",
  about: "persona/elaine",
  secrets: "jsonl",
} as const satisfies Lore
