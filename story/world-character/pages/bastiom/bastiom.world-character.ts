import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bastiom = {
  id: "01a0b707-7bf7-702b-a0d0-544970b46bf2",
  type: "page-type/world-character",
  slug: "bastiom",
  title: "Bastiom",
  world: "world/the-wandering-inn",
  firstChapter: 199,
  lastChapter: 575,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
