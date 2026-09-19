import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const varnie = {
  id: "01a0b70d-88cc-741c-b122-ead9824e3528",
  type: "page-type/world-character",
  slug: "varnie",
  title: "Varnie",
  world: "world/the-wandering-inn",
  firstChapter: 821,
  lastChapter: 821,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
