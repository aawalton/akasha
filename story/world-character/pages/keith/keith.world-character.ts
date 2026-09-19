import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const keith = {
  id: "01a0b70b-6132-7b2d-b9bc-e41792378cdf",
  type: "page-type/world-character",
  slug: "keith",
  title: "Keith",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 215,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
