import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const empressNsiia = {
  id: "01a0b70a-6cd9-7892-9a86-3702fabb83b8",
  type: "page-type/world-character",
  slug: "empress-nsiia",
  title: "Empress Nsiia of Tiqr",
  world: "world/the-wandering-inn",
  firstChapter: 553,
  lastChapter: 553,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
