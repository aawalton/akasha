import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const beatica = {
  id: "01a0b707-7e66-76be-98eb-d9e6879a2b45",
  type: "page-type/world-character",
  slug: "beatica",
  title: "Beatica",
  world: "world/the-wandering-inn",
  firstChapter: 350,
  lastChapter: 350,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
