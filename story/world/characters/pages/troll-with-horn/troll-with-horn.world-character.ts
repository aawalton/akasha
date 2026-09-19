import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const trollWithHorn = {
  id: "01a0b70d-725d-7256-a69f-8ad3aeecec26",
  type: "page-type/world-character",
  slug: "troll-with-horn",
  title: "the Troll with the horn",
  world: "world/the-wandering-inn",
  firstChapter: 723,
  lastChapter: 723,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
