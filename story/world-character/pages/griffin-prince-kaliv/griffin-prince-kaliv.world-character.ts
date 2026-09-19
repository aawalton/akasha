import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const griffinPrinceKaliv = {
  id: "01a0b70a-eb89-7167-9faa-95ef19efb9e6",
  type: "page-type/world-character",
  slug: "griffin-prince-kaliv",
  title: "The Griffin Prince",
  world: "world/the-wandering-inn",
  firstChapter: 422,
  lastChapter: 422,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
