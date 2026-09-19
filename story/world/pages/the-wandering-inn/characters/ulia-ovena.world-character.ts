import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const uliaOvena = {
  id: "01a0b70d-7c14-77f6-9fcd-651a43020eef",
  type: "page-type/world-character",
  slug: "ulia-ovena",
  title: "Ulia Ovena",
  world: "world/the-wandering-inn",
  firstChapter: 200,
  lastChapter: 200,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
