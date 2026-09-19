import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const niila = {
  id: "01a0b70c-099b-7048-80c5-26a24117cf94",
  type: "page-type/world-character",
  slug: "niila",
  title: "Niila",
  world: "world/the-wandering-inn",
  firstChapter: 470,
  lastChapter: 470,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
