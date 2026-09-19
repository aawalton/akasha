import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gaziTheOmniscient = {
  id: "01a0b70a-94ad-7994-8039-34e293c813d9",
  type: "page-type/world-character",
  slug: "gazi-the-omniscient",
  title: "Gazi",
  world: "world/the-wandering-inn",
  firstChapter: 116,
  lastChapter: 116,
  characterClaims: "jsonl",
  aliasOf: "world-character/gazi",
} as const satisfies WorldCharacter
