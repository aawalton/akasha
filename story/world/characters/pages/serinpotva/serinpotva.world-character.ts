import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serinpotva = {
  id: "01a0b70c-f843-7e49-af57-7e3520199f9d",
  type: "page-type/world-character",
  slug: "serinpotva",
  title: "Serinpotva",
  world: "world/the-wandering-inn",
  firstChapter: 634,
  lastChapter: 710,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
