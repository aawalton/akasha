import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const persuaMavva = {
  id: "01a0b70c-6856-7ea9-81e3-59cc6b7783f8",
  type: "page-type/world-character",
  slug: "persua-mavva",
  title: "Persua Mavva",
  world: "world/the-wandering-inn",
  firstChapter: 655,
  lastChapter: 664,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
