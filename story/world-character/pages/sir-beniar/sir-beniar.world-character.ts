import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sirBeniar = {
  id: "01a0b70d-019e-744f-9a24-12008943a9de",
  type: "page-type/world-character",
  slug: "sir-beniar",
  title: "Sir Beniar",
  world: "world/the-wandering-inn",
  firstChapter: 263,
  lastChapter: 263,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
