import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const raich = {
  id: "01a0b70c-85ef-734a-8d46-95ee9a8a97cb",
  type: "page-type/world-character",
  slug: "raich",
  title: "Raich",
  world: "world/the-wandering-inn",
  firstChapter: 601,
  lastChapter: 601,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
