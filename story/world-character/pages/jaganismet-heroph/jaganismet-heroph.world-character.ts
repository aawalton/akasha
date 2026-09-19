import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jaganismetHeroph = {
  id: "01a0b70b-17dd-78b8-b2d6-2bb859d6ad81",
  type: "page-type/world-character",
  slug: "jaganismet-heroph",
  title: "Jaganismet",
  world: "world/the-wandering-inn",
  firstChapter: 704,
  lastChapter: 704,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
