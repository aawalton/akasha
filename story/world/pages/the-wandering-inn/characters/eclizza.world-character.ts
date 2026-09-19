import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eclizza = {
  id: "01a0b70a-22b5-7b04-998b-d38e170f5acb",
  type: "page-type/world-character",
  slug: "eclizza",
  title: "Eclizza",
  world: "world/the-wandering-inn",
  firstChapter: 775,
  lastChapter: 781,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
