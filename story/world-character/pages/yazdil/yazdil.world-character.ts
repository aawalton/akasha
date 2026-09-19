import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yazdil = {
  id: "01a0b70d-d945-72c4-b024-f55161c8a70e",
  type: "page-type/world-character",
  slug: "yazdil",
  title: "Yazdil",
  world: "world/the-wandering-inn",
  firstChapter: 676,
  lastChapter: 676,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
