import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rafaema = {
  id: "01a0b70c-81c0-7b87-8798-47af0b38d57a",
  type: "page-type/world-character",
  slug: "rafaema",
  title: "Rafaema",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
