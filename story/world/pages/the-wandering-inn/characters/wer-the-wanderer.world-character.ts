import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const werTheWanderer = {
  id: "01a0b70d-9c51-77cd-923e-0ae2aeb93ff3",
  type: "page-type/world-character",
  slug: "wer-the-wanderer",
  title: "Wer",
  world: "world/the-wandering-inn",
  firstChapter: 578,
  lastChapter: 677,
  characterClaims: "jsonl",
  aliasOf: "world-character/wer",
} as const satisfies WorldCharacter
