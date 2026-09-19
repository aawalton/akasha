import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const actingAdmiralLouseg = {
  id: "01a0b707-5fda-738c-a4ff-12d8b8ef26db",
  type: "page-type/world-character",
  slug: "acting-admiral-louseg",
  title: "Louseg",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
