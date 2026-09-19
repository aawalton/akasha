import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lilbrasi = {
  id: "01a0b70b-8446-7ee9-89a6-7cb9987cbcd7",
  type: "page-type/world-character",
  slug: "lilbrasi",
  title: "Lilbrasi",
  world: "world/the-wandering-inn",
  firstChapter: 720,
  lastChapter: 720,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
