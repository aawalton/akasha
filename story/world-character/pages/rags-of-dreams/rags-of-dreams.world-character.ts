import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ragsOfDreams = {
  id: "01a0b70c-857d-7c55-9bb7-1407866fc0aa",
  type: "page-type/world-character",
  slug: "rags-of-dreams",
  title: "Rags of Dreams",
  world: "world/the-wandering-inn",
  firstChapter: 760,
  lastChapter: 760,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
