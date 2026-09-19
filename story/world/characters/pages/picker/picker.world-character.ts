import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const picker = {
  id: "01a0b70c-6cd2-70c9-b641-ca399d122863",
  type: "page-type/world-character",
  slug: "picker",
  title: "Picker",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
