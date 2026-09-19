import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ridleyWallis = {
  id: "01a0b70c-97da-768b-a8cd-18b1599bbec4",
  type: "page-type/world-character",
  slug: "ridley-wallis",
  title: "Ridley Wallis",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
