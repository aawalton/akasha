import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wilen = {
  id: "01a0b70d-9e61-7557-b735-31fa35f3a16e",
  type: "page-type/world-character",
  slug: "wilen",
  title: "Wilen",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 98,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
