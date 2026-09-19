import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nuneSalismen = {
  id: "01a0b70c-132e-7a4e-a3f0-7570c131fdd5",
  type: "page-type/world-character",
  slug: "nune-salismen",
  title: "Nune Salismen",
  world: "world/the-wandering-inn",
  firstChapter: 181,
  lastChapter: 181,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
