import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const joiahKellisman = {
  id: "01a0b70b-20ba-76c3-b728-a3428432031d",
  type: "page-type/world-character",
  slug: "joiah-kellisman",
  title: "Joiah Kellisman",
  world: "world/the-wandering-inn",
  firstChapter: 283,
  lastChapter: 283,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
