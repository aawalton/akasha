import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ekirra = {
  id: "01a0b70a-248b-7538-b625-aae44edb73bd",
  type: "page-type/world-character",
  slug: "ekirra",
  title: "Ekirra",
  world: "world/the-wandering-inn",
  firstChapter: 405,
  lastChapter: 656,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
