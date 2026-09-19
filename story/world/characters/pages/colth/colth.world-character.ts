import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const colth = {
  id: "01a0b70a-0580-738a-ab21-b0beceb72800",
  type: "page-type/world-character",
  slug: "colth",
  title: "Colth",
  world: "world/the-wandering-inn",
  firstChapter: 619,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
