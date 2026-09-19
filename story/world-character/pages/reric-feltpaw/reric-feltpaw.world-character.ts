import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rericFeltpaw = {
  id: "01a0b70c-908b-72b6-a486-945de18f9b56",
  type: "page-type/world-character",
  slug: "reric-feltpaw",
  title: "Reric Feltpaw",
  world: "world/the-wandering-inn",
  firstChapter: 379,
  lastChapter: 379,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
