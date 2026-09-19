import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lazimeh = {
  id: "01a0b70b-7e97-7e22-94d9-1c1441e5fde8",
  type: "page-type/world-character",
  slug: "lazimeh",
  title: "Lazimeh",
  world: "world/the-wandering-inn",
  firstChapter: 807,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
