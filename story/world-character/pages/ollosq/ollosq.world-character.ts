import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ollosq = {
  id: "01a0b70c-1801-77ef-8344-36818d63eaaa",
  type: "page-type/world-character",
  slug: "ollosq",
  title: "Ollosq",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
