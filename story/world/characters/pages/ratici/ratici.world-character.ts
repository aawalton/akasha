import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ratici = {
  id: "01a0b70c-87ac-7f46-8702-afcda4a53022",
  type: "page-type/world-character",
  slug: "ratici",
  title: "Ratici",
  world: "world/the-wandering-inn",
  firstChapter: 450,
  lastChapter: 628,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
