import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mefaa = {
  id: "01a0b70b-e457-75d7-aa61-26756fab9651",
  type: "page-type/world-character",
  slug: "mefaa",
  title: "Mefaa",
  world: "world/the-wandering-inn",
  firstChapter: 398,
  lastChapter: 398,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
