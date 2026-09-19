import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const venim = {
  id: "01a0b70d-8dd6-7364-83f4-a983123a79c8",
  type: "page-type/world-character",
  slug: "venim",
  title: "Watch Captain Venim",
  world: "world/the-wandering-inn",
  firstChapter: 242,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
