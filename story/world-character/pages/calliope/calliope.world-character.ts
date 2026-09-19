import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const calliope = {
  id: "01a0b707-9052-7b9e-9557-9cfe533f018b",
  type: "page-type/world-character",
  slug: "calliope",
  title: "Calliope",
  world: "world/the-wandering-inn",
  firstChapter: 181,
  lastChapter: 323,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
