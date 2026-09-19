import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const voiceIkeiret = {
  id: "01a0b70d-9655-7bae-882f-a895637f1267",
  type: "page-type/world-character",
  slug: "voice-ikeiret",
  title: "Voice Ikeiret",
  world: "world/the-wandering-inn",
  firstChapter: 691,
  lastChapter: 691,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
