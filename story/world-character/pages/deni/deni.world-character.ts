import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const deni = {
  id: "01a0b70a-179b-7a67-a968-b9e0cc00d4cd",
  type: "page-type/world-character",
  slug: "deni",
  title: "Deniusth",
  world: "world/the-wandering-inn",
  firstChapter: 616,
  lastChapter: 616,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
