import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const oesca = {
  id: "01a0b70c-153c-7ea8-84b8-09bdc0c70501",
  type: "page-type/world-character",
  slug: "oesca",
  title: "Oesca",
  world: "world/the-wandering-inn",
  firstChapter: 571,
  lastChapter: 571,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
