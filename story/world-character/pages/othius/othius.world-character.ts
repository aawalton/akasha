import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const othius = {
  id: "01a0b70c-1e7f-777d-a5a5-9babf170fe5c",
  type: "page-type/world-character",
  slug: "othius",
  title: "Othius the Fourth",
  world: "world/the-wandering-inn",
  firstChapter: 593,
  lastChapter: 593,
  characterClaims: "jsonl",
  aliasOf: "world-character/othius-iv",
} as const satisfies WorldCharacter
