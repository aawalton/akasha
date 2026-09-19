import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainKel = {
  id: "01a0b707-932a-7053-bd63-89ce0b00041c",
  type: "page-type/world-character",
  slug: "captain-kel",
  title: "Captain Kel",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
