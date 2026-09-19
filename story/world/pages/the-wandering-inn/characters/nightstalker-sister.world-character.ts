import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nightstalkerSister = {
  id: "01a0b70c-0962-7159-b354-c1c4fcb3bacc",
  type: "page-type/world-character",
  slug: "nightstalker-sister",
  title: "the Sister",
  world: "world/the-wandering-inn",
  firstChapter: 347,
  lastChapter: 347,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
