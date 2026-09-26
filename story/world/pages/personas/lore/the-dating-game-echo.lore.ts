import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameEcho = {
  id: "01a0de59-9645-7d19-8493-9e3ec1f31af8",
  type: "page-type/lore",
  slug: "the-dating-game-echo",
  title: "Echo",
  world: "world/personas",
  about: "persona/echo",
  secrets: "jsonl",
} as const satisfies Lore
