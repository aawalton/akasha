import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cawe = {
  id: "01a0b709-f7ee-736a-a1b3-756aba67287d",
  type: "page-type/world-character",
  slug: "cawe",
  title: "Cawe",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 529,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
