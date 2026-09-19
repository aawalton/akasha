import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hethonVeltras = {
  id: "01a0b70a-fa97-7e27-8d96-c129b99fe363",
  type: "page-type/world-character",
  slug: "hethon-veltras",
  title: "Hethon Veltras",
  world: "world/the-wandering-inn",
  firstChapter: 425,
  lastChapter: 690,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
