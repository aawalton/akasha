import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyCalva = {
  id: "01a0b70b-7250-7891-9b6d-0351ffff93e1",
  type: "page-type/world-character",
  slug: "lady-calva",
  title: "Lady Calva",
  world: "world/the-wandering-inn",
  firstChapter: 720,
  lastChapter: 720,
  characterClaims: "jsonl",
  aliasOf: "world-character/lady-calva-lanight",
} as const satisfies WorldCharacter
