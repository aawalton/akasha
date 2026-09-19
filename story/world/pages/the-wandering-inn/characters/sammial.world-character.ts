import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sammial = {
  id: "01a0b70c-ac23-7ff8-b3fc-220f7c25b33c",
  type: "page-type/world-character",
  slug: "sammial",
  title: "Sammial",
  world: "world/the-wandering-inn",
  firstChapter: 527,
  lastChapter: 656,
  characterClaims: "jsonl",
  aliasOf: "world-character/sammial-veltras",
} as const satisfies WorldCharacter
