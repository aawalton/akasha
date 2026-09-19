import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const shaullile = {
  id: "01a0b70c-fbbc-7d41-ac97-73a7f8b2b1f2",
  type: "page-type/world-character",
  slug: "shaullile",
  title: "Shaullile",
  world: "world/the-wandering-inn",
  firstChapter: 676,
  lastChapter: 676,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
