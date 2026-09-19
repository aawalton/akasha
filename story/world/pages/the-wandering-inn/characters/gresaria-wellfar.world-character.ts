import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gresariaWellfar = {
  id: "01a0b70a-ea14-78b9-939e-f4d7d8317757",
  type: "page-type/world-character",
  slug: "gresaria-wellfar",
  title: "Lady Gresaria",
  world: "world/the-wandering-inn",
  firstChapter: 444,
  lastChapter: 599,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
