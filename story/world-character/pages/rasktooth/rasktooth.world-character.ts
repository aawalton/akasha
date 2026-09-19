import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rasktooth = {
  id: "01a0b70c-8706-7f1c-a25a-c5152242de2b",
  type: "page-type/world-character",
  slug: "rasktooth",
  title: "Rasktooth",
  world: "world/the-wandering-inn",
  firstChapter: 621,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
